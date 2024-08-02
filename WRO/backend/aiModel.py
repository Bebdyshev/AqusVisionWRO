from datetime import datetime, timedelta
import random

def generate(date_str):
    start_date = datetime.strptime(date_str, '%Y-%m-%d')

    prediction = [12, 12, 233, 34, 54]
    actual_data = [11, 14, 225, 32, 52]
    date_array = []

    for i in range(10):
        date = start_date + timedelta(days=i)
        date_array.append(date.strftime('%d %b %Y'))

    return prediction, actual_data, date_array
