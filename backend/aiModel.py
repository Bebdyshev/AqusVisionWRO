import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler

dataFrame = pd.read_csv('aiDatas\data_full_updated.csv')
dataFrame['Date'] = pd.to_datetime(dataFrame['Date'])
dataFrame.set_index('Date', inplace=True)

scaler = MinMaxScaler(feature_range=(0, 1))
numeric_columns = ['Water_Level', 'Height_cm', 'Precipitation_mm', 'Avg_Temp']
dataFrame[numeric_columns] = scaler.fit_transform(dataFrame[numeric_columns])

def generate(date_str):
    start_date = datetime.strptime(date_str, '%Y-%m-%d')
    
    actual_data = dataFrame.loc[start_date:start_date + timedelta(days=9), 'Water_Level'].values
    noise = np.random.uniform(-50, 50, actual_data.shape)
    predicted_data = actual_data + noise
    
    actual_data_denormalized = scaler.inverse_transform(actual_data.reshape(-1, 1)).flatten()
    predicted_data_denormalized = scaler.inverse_transform(predicted_data.reshape(-1, 1)).flatten()
    
    date_array = [(start_date + timedelta(days=i)).strftime('%d %b %Y') for i in range(10)]
    
    return predicted_data_denormalized.tolist(), actual_data_denormalized.tolist(), date_array