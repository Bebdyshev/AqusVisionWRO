import serial
import threading
from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from config import app, db
from models import DataSet, GroundBuoy, GroundStation
from datetime import datetime
from aiModel import generate
import json
import random
import os

def serial_reader():
    try:
        ser = serial.Serial('COM3', 115200)
        while True:
            data_line = ser.readline().decode('utf-8').strip()
            process_serial_data(data_line)
    except Exception as e:
        print(f"Serial error: {e}")
    finally:
        if 'ser' in locals() and ser.is_open:
            ser.close()

def process_serial_data(data_line):
    try:
        with app.app_context():
            data_parts = data_line.split(';')
            buoy_id = int(data_parts[0])
            current_time = datetime.now()

            if buoy_id == 1:
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

            elif buoy_id == 2:
                snow_depth = float(data_parts[2])
                precipitation = float(data_parts[3])
                soil_temp = float(data_parts[4])
                air_temp = float(data_parts[5])
                humidity = float(data_parts[6])

                new_data = GroundBuoy(
                    buoy_id=buoy_id,
                    time=current_time,
                    snowDepth=snow_depth,
                    precipitation=precipitation,
                    soilTemperature=soil_temp,
                    airTemperature=air_temp,
                    humidity=humidity
                )
            elif buoy_id == 3:
                above_ground_level = float(data_parts[2])
                under_ground_level = float(data_parts[3])

                new_data = GroundStation(
                    buoy_id=buoy_id,
                    time=current_time,
                    aboveGroundLevel=above_ground_level,
                    underGroundLevel=under_ground_level
                )
            
            db.session.add(new_data)
            db.session.commit()
    except Exception as e:
        print(f"Data processing error: {e}")

@app.route('/data', methods=['GET'])
def get_data():
    try:
        dataSet = DataSet.query.all()
        json_dataSet = [data.to_json() for data in dataSet]
        return jsonify({"data": json_dataSet})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/data_ground', methods=['GET'])
def get_data_ground():
    try:
        groundBuoyData = GroundBuoy.query.all()
        json_groundBuoyData = [data.to_json() for data in groundBuoyData]
        return jsonify({"data": json_groundBuoyData})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/data_ground_station', methods=['GET'])
def get_data_ground_station():
    try:
        groundStationData = GroundStation.query.all()
        json_groundStationData = [data.to_json() for data in groundStationData]
        return jsonify({"data": json_groundStationData})
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/create_data', methods=['POST'])
def create_data():
    try:
        data = request.json
        buoy_id = int(data['buoy_id'])
        current_time = datetime.now()

        if buoy_id == 1:
            new_data = DataSet(
                buoy_id=buoy_id,
                time=current_time,
                height=float(data['height']),
                latitude=float(data['latitude']),
                longitude=float(data['longitude']),
                pressure=float(data['pressure']),
                temp=float(data['temp']),
                density=float(data['density']),
                ph=float(data['ph']),
                velocity=float(data['velocity']),
                pitch=float(data['pitch']),
                roll=float(data['roll']),
                yaw=float(data['yaw'])
            )

        elif buoy_id == 2:
            new_data = GroundBuoy(
                buoy_id=buoy_id,
                time=current_time,
                snowDepth=float(data['snowDepth']),
                precipitation=float(data['precipitation']),
                soilTemperature=float(data['soilTemperature']),
                airTemperature=float(data['airTemperature']),
                humidity=float(data['humidity'])
            )

        elif buoy_id == 3:
            new_data = GroundStation(
                buoy_id=buoy_id,
                time=current_time,
                aboveGroundLevel=float(data['aboveGroundLevel']),
                underGroundLevel=float(data['underGroundLevel'])
            )

        else:
            return jsonify({"message": "Invalid buoy_id"}), 400

        db.session.add(new_data)
        db.session.commit()

        return jsonify({"message": "Data added successfully"}), 201

    except Exception as e:
        return jsonify({"message": f"Data creation error: {str(e)}"}), 500


@app.route('/delete_all_data', methods=['DELETE'])
def delete_all_data():
    try:
        with app.app_context():
            num_rows_deleted = db.session.query(DataSet).delete()
            db.session.commit()
            return jsonify({"message": f"Deleted {num_rows_deleted} rows from DataSet table."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/predict', methods=['GET'])
def predict_flooding():
    try:
        date = request.args.get('date')
        if not date:
            return jsonify({"message": "Date parameter is required"}), 400

        predictedData, actualData, dateArray = generate(date)
        
        return jsonify({
            "predict": predictedData,
            "actual": actualData,
            "dates": dateArray
        }), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

frontend_folder = os.path.join(os.getcwd(), "..", "frontend", "dist")

@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(frontend_folder, filename)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    serial_thread = threading.Thread(target=serial_reader)
    serial_thread.start()

    app.run(debug=True)
