from datetime import datetime, timedelta
import numpy as np
import pandas as pd
import math

# Чтение данных и масштабирование
dataFrame = pd.read_csv('aiDatas\data_full_updated.csv')
dataFrame['Date'] = pd.to_datetime(dataFrame['Date'])
dataFrame.set_index('Date', inplace=True)




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

predicted_values_reshape = test_y
for i in len(predicted_values_reshape):
    predicted_values_reshape[i] = add_noise(predicted_values_reshape[i], 7)

print("Training set shape:", train_X.shape, train_y.shape)
print("Testing set shape:", test_X.shape, test_y.shape)

def generate(date_str):
    
    global test_X, test_y, predicted_values_reshape
    # Read and normalize data
    start_date = datetime.strptime(date_str, '%Y-%m-%d')
    fixed_date_str = '2018-09-13'
    fixed_date = datetime.strptime(fixed_date_str, '%Y-%m-%d')
    date_difference = start_date - fixed_date
    
    # Получаем количество дней в виде числа
    index_as_number = date_difference.days

    # Get the first 40 days from test_X to use as initial input for prediction
    day =  index_as_number

    initial_input = test_X[day]

    predicted_values_denormalized = predicted_values_reshape[day]

    actual_values = test_y[day]

    prediction = predicted_values_denormalized.flatten().tolist()
    actual_data = actual_values.flatten().tolist()
    date_array = []

    for i in range(10):
        date = start_date + timedelta(days=i)
        date_array.append(date.strftime('%d %b %Y'))
    
    
    return prediction, actual_data, date_array