from config import db

class DataSet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buoy_id = db.Column(db.Integer, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    height = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    pressure = db.Column(db.Float, nullable=False)
    temp = db.Column(db.Float, nullable=False)
    density = db.Column(db.Float, nullable=False)
    ph = db.Column(db.Float, nullable=False)
    velocity = db.Column(db.Float, nullable=False)
    pitch = db.Column(db.Float, nullable=False)
    roll = db.Column(db.Float, nullable=False)
    yaw = db.Column(db.Float, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "buoy_id": self.buoy_id,
            "time": self.time,
            "height": self.height,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "pressure": self.pressure,
            "temp": self.temp,
            "density": self.density,
            "ph": self.ph,
            "velocity": self.velocity,
            "pitch": self.pitch,
            "roll": self.roll,
            "yaw": self.yaw,
        }
