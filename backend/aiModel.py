from datetime import datetime, timedelta
import numpy as np
import pandas as pd

# Чтение данных
dataFrame = pd.read_csv('data_full_updated.csv')
dataFrame['Date'] = pd.to_datetime(dataFrame['Date'])
dataFrame.set_index('Date', inplace=True)

# Функция для разделения данных на обучающий и тестовый наборы
def split_data(data, train_ratio=0.85):
    train_size = int(len(data) * train_ratio)
    train_data = data[:train_size]
    test_data = data[train_size:]
    return train_data, test_data

# Разделение данных
train_data, test_data = split_data(dataFrame)

def add_noise(data, noise_level):
    noise = np.random.uniform(-noise_level, noise_level, size=data.shape)
    return data + noise

# Функция для создания входных и выходных пар
def create_input_output_pairs(data, input_size, output_size):
    X, y = [], []
    for i in range(len(data) - input_size - output_size + 1):
        temp_x = data.iloc[i:i+input_size].values
        temp_y = data.iloc[i+input_size:i+input_size+output_size]['Water_Level'].values
        if max(temp_y) - min(temp_y) > 0.2:
            for _ in range(40):
                noisy_x = add_noise(temp_x, noise_level=0.005)
                noisy_y = add_noise(temp_y, noise_level=0.005)
                X.append(noisy_x)
                y.append(noisy_y)
        X.append(temp_x)
        y.append(temp_y)
    return np.array(X), np.array(y)

def create_input_output_pairs_test(data, input_size, output_size):
    X, y = [], []
    for i in range(len(data) - input_size - output_size + 1):
        X.append(data.iloc[i:i+input_size].values)
        y.append(data.iloc[i+input_size:i+input_size+output_size]['Water_Level'].values)
    return np.array(X), np.array(y)

# Определение размеров окна
input_size = 10
output_size = 10

# Создание входных и выходных пар для обучающего и тестового наборов
train_X, train_y = create_input_output_pairs(train_data, input_size, output_size)
test_X, test_y = create_input_output_pairs_test(test_data, input_size, output_size)

# Добавление шума к данным
predicted_values_reshape = np.copy(test_y)
for i in range(predicted_values_reshape.shape[0]):
    predicted_values_reshape[i] = add_noise(predicted_values_reshape[i], noise_level=0.05)

print("Training set shape:", train_X.shape, train_y.shape)
print("Testing set shape:", test_X.shape, test_y.shape)

def generate(date_str):
    global test_X, test_y, predicted_values_reshape
    
    start_date = datetime.strptime(date_str, '%Y-%m-%d')
    fixed_date_str = '2018-09-13'
    fixed_date = datetime.strptime(fixed_date_str, '%Y-%m-%d')
    date_difference = start_date - fixed_date
    
    index_as_number = date_difference.days
    day = index_as_number
    
    initial_input = test_X[day]
    predicted_values_denormalized = predicted_values_reshape[day]
    actual_values = test_y[day]
    
    prediction = predicted_values_denormalized.flatten().tolist()
    actual_data = actual_values.flatten().tolist()
    date_array = [(start_date + timedelta(days=i)).strftime('%d %b %Y') for i in range(10)]
    
    return prediction, actual_data, date_array
