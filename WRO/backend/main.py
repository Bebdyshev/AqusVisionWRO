# main.py
import serial
import threading
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import app, db
from models import DataSet
from datetime import datetime

# Serial communication thread function
def serial_reader():
    try:
        ser = serial.Serial('COM6', 115200)
        while True:
            data_line = ser.readline().decode('utf-8').strip()
            process_serial_data(data_line)
    except Exception as e:
        print(f"Serial error: {e}")
    finally:
        if 'ser' in locals() and ser.is_open:
            ser.close()

# Function to process serial data and save to database
def process_serial_data(data_line):
    try:
        with app.app_context():
            data_parts = data_line.split(';')

            buoy_id = int(data_parts[0])
            current_time = datetime.now()
            ph = float(data_parts[2])
            height = float(data_parts[3])
            latitude = float(data_parts[4])
            longitude = float(data_parts[5])
            temp = float(data_parts[6])
            density = float(data_parts[7])
            velocity = float(data_parts[8])
            pressure = float(data_parts[9])
            pitch = float(data_parts[10])
            roll = float(data_parts[11])
            yaw = float(data_parts[12])

            new_data = DataSet(
                buoy_id=buoy_id,
                time=current_time,
                height=height,
                latitude=latitude,
                longitude=longitude,
                pressure=pressure,
                temp=temp,
                density=density,
                ph=ph,
                velocity=velocity,
                pitch=pitch,
                roll=roll,
                yaw=yaw
            )

            db.session.add(new_data)
            db.session.commit()

    except Exception as e:
        print(f"Data processing error: {e}")

# Flask routes
@app.route('/data', methods=['GET'])
def get_data():
    try:
        dataSet = DataSet.query.all()
        json_dataSet = [data.to_json() for data in dataSet]
        return jsonify({"data": json_dataSet})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/create_data', methods=['POST'])
def create_data():
    return jsonify({"message": "This endpoint is disabled."}), 403

@app.route('/delete_all_data', methods=['DELETE'])
def delete_all_data():
    try:
        with app.app_context():
            num_rows_deleted = db.session.query(DataSet).delete()
            db.session.commit()
            return jsonify({"message": f"Deleted {num_rows_deleted} rows from DataSet table."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    serial_thread = threading.Thread(target=serial_reader)
    serial_thread.start()

    app.run(debug=True)
