from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd
import tensorflow as tf
import math
import keras
from keras import layers, regularizers
from keras.models import load_model
from keras.utils import custom_object_scope, get_custom_objects


class ReduceMeanLayer(layers.Layer):
    def __init__(self, **kwargs):
        super(ReduceMeanLayer, self).__init__(**kwargs)
    
    def call(self, inputs):
        return tf.reduce_mean(inputs, axis=1)
    
    def get_config(self):
        config = super(ReduceMeanLayer, self).get_config()
        return config

# Чтение данных и масштабирование
dataFrame = pd.read_csv('aiDatas\data_full_updated.csv')
dataFrame['Date'] = pd.to_datetime(dataFrame['Date'])
dataFrame.set_index('Date', inplace=True)

scaler = MinMaxScaler(feature_range=(0, 1))
numeric_columns = ['Water_Level', 'Height_cm', 'Precipitation_mm', 'Avg_Temp']
dataFrame[numeric_columns] = scaler.fit_transform(dataFrame[numeric_columns])

# Функция для разделения данных на обучающий и тестовый наборы
def split_data(data, train_ratio=0.85):
    train_size = int(len(data) * train_ratio)
    train_data = data[:train_size]
    test_data = data[train_size:]
    return train_data, test_data

# Разделение отмасштабированных данных на обучающий и тестовый наборы
train_data, test_data = split_data(dataFrame)

print("Training set size:", len(train_data))
print("Testing set size:", len(test_data))

# Используем custom_object_scope для регистрации кастомного слоя при загрузке модели
# Загрузка модели с кастомным слоем
with custom_object_scope({'ReduceMeanLayer': ReduceMeanLayer}):
    model = load_model('best_model_1.keras')




def add_noise(data, noise_level=0.007):
    noise = np.random.uniform(-noise_level, noise_level, size=data.shape)
    return data + noise

# Функция для создания входных и выходных пар с окнами 40 дней на 15 дней
def create_input_output_pairs(data, input_size, output_size):
    X = []
    y = []
    for i in range(len(data) - input_size - output_size + 1):
        temp_x = data.iloc[i:i+input_size].values
        temp_y = data.iloc[i+input_size:i+input_size+output_size]['Water_Level'].values
        temp_x1 = data.iloc[i-input_size:i+input_size-input_size].values
        temp_y1 = data.iloc[i+input_size-input_size:i+input_size+output_size-input_size]['Water_Level'].values
        if max(temp_y) - min(temp_y) > 0.2:
            for z in range(40):
                noisy_x1 = add_noise(temp_x1, noise_level=0.005)  # Добавляем шум к входным данным
                noisy_y1 = add_noise(temp_y1, noise_level=0.005)  # Добавляем шум к выходным данным
                X.append(noisy_x1)
                y.append(noisy_y1)
            for z in range(10): 
                noisy_x = add_noise(temp_x, noise_level=0.005)  # Добавляем шум к входным данным
                noisy_y = add_noise(temp_y, noise_level=0.005)  # Добавляем шум к выходным данным
                X.append(noisy_x)
                y.append(noisy_y)
        X.append(data.iloc[i:i+input_size].values)
        y.append(data.iloc[i+input_size:i+input_size+output_size]['Water_Level'].values)
    X = np.array(X)
    y = np.array(y)
    return X, y

def create_input_output_pairs_test(data, input_size, output_size):
    X = []
    y = []
    for i in range(len(data) - input_size - output_size + 1):
        X.append(data.iloc[i:i+input_size].values)
        y.append(data.iloc[i+input_size:i+input_size+output_size]['Water_Level'].values)
    X = np.array(X)
    y = np.array(y)
    return X, y

# Определение размеров окна
input_size = 10
output_size = 10

# Создание входных и выходных пар для обучающего и тестового наборов
train_X, train_y = create_input_output_pairs(train_data, input_size, output_size)
test_X, test_y = create_input_output_pairs_test(test_data, input_size, output_size)

print("Training set shape:", train_X.shape, train_y.shape)
print("Testing set shape:", test_X.shape, test_y.shape)

def generate(date_str):
    
    global model, test_X, test_y
    # Read and normalize data
    start_date = datetime.strptime(date_str, '%Y-%m-%d')
    fixed_date_str = '2018-09-13'
    fixed_date = datetime.strptime(fixed_date_str, '%Y-%m-%d')
    date_difference = start_date - fixed_date
    
    # Получаем количество дней в виде числа
    index_as_number = date_difference.days

    dfdf = pd.read_csv('aiDatas\data_full_updated.csv')

    # Initialize scaler for Water_Level
    water_level_scaler = MinMaxScaler(feature_range=(0, 1))

    # Fit the scaler on Water_Level column
    dfdf['Water_Level'] = dfdf[['Water_Level']]  # Ensure it's a 2D array
    water_level_scaler.fit(dfdf[['Water_Level']])

    # Normalize Water_Level in the DataFrame
    dfdf['Water_Level'] = water_level_scaler.transform(dfdf[['Water_Level']])

    # Get the first 40 days from test_X to use as initial input for prediction
    day =  index_as_number

    initial_input = test_X[day]

    # Predict the next 15 days using the model
    predicted_values = model.predict(initial_input[np.newaxis, :, :])

    # Reshape predicted_values to match scaler in put (2D array)
    predicted_values_reshaped = predicted_values.reshape(-1, 1)

    # Denormalize the predicted values
    predicted_values_denormalized = water_level_scaler.inverse_transform(predicted_values_reshaped)

    # Reshape actual_values for comparison
    actual_values = test_y[day]
    actual_values_reshaped = actual_values.reshape(-1, 1)
    actual_values_denormalized = water_level_scaler.inverse_transform(actual_values_reshaped)

    prediction = predicted_values_denormalized.flatten().tolist()
    actual_data = actual_values_denormalized.flatten().tolist()
    date_array = []

    for i in range(10):
        date = start_date + timedelta(days=i)
        date_array.append(date.strftime('%d %b %Y'))
    
    
    return prediction, actual_data, date_array