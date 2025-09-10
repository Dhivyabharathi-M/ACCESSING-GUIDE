# backend/app/models.py
from datetime import datetime
from .extensions import db

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, index=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    disability_type = db.Column(db.String(50), nullable=True)  # blind | deaf | mobility
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    bookings = db.relationship("Booking", backref="user", lazy=True)

class Booking(db.Model):
    __tablename__ = "bookings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    pickup = db.Column(db.String(255), nullable=False)
    dropoff = db.Column(db.String(255), nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    return_trip = db.Column(db.Boolean, default=False)
    entry_type = db.Column(db.String(50), nullable=False)  # side | rear
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Place(db.Model):
    __tablename__ = "places"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(255), nullable=True)
    google_place_id = db.Column(db.String(128), index=True, nullable=True)
    wheelchair_access = db.Column(db.Boolean, default=False)
    ramps = db.Column(db.Boolean, default=False)
    accessible_toilet = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)