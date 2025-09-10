# backend/app/routes/bookings.py
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models import Booking

bookings_bp = Blueprint("bookings", __name__)

@bookings_bp.post("/")
@jwt_required()
def create_booking():
    uid = get_jwt_identity()
    data = request.get_json() or {}
    try:
        dt = datetime.fromisoformat(data["datetime"])
    except Exception:
        return jsonify({"error": "invalid datetime ISO format"}), 400
    booking = Booking(
        user_id=uid,
        pickup=data["pickup"],
        dropoff=data["dropoff"],
        datetime=dt,
        return_trip=bool(data.get("return_trip", False)),
        entry_type=data.get("entry_type", "side"),
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({"id": booking.id}), 201

@bookings_bp.get("/")
@jwt_required()
def list_bookings():
    uid = get_jwt_identity()
    items = Booking.query.filter_by(user_id=uid).order_by(Booking.created_at.desc()).all()
    return jsonify([
        {
            "id": b.id,
            "pickup": b.pickup,
            "dropoff": b.dropoff,
            "datetime": b.datetime.isoformat(),
            "return_trip": b.return_trip,
            "entry_type": b.entry_type,
        } for b in items
    ])