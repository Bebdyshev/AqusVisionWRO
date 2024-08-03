from datetime import datetime, timedelta
import random

def generate(date_str):
    start_date = datetime.strptime(date_str, '%Y-%m-%d')

    prediction = [random.randint(10, 250) for _ in range(10)]
    actual_data = [random.randint(10, 250) for _ in range(10)]
    date_array = []

    for i in range(10):
        date = start_date + timedelta(days=i)
        date_array.append(date.strftime('%d %b %Y'))

    return prediction, actual_data, date_array