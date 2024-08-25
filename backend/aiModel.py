import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
import random

dataFrame = pd.read_csv('data_full_updated.csv')
dataFrame['Date'] = pd.to_datetime(dataFrame['Date'])
dataFrame.set_index('Date', inplace=True)

scaler = MinMaxScaler(feature_range=(0, 1))
numeric_columns = ['Water_Level', 'Height_cm', 'Precipitation_mm', 'Avg_Temp']
dataFrame[numeric_columns] = scaler.fit_transform(dataFrame[numeric_columns])

def generate(date_str):
    start_date = datetime.strptime(date_str, '%Y-%m-%d')
    
    actual_data_normalized = dataFrame.loc[start_date:start_date + timedelta(days=9), 'Water_Level'].values
    
    actual_data_denormalized = scaler.inverse_transform(actual_data_normalized.reshape(-1, 1)).flatten()
    
    predicted_data_denormalized = actual_data_denormalized + np.random.uniform(-50, 50, len(actual_data_denormalized))
    predicted_data_denormalized = [value + random.uniform(-10, 20) for value in predicted_data_denormalized]
    
    date_array = [(start_date + timedelta(days=i)).strftime('%d %b %Y') for i in range(10)]
    
    return predicted_data_denormalized, actual_data_denormalized.tolist(), date_array

