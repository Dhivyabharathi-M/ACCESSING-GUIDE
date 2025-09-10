# backend/app/routes/auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..extensions import db
from ..models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/signup")
def signup():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    disability_type = data.get("disability_type")
    if not email or not password:
        return jsonify({"error": "email and password required"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "email already registered"}), 400
    user = User(
        email=email,
        password_hash=generate_password_hash(password),
        disability_type=disability_type,
    )
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=user.id)
    return jsonify({"token": token, "user": {"id": user.id, "email": user.email, "disability_type": user.disability_type}})

@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "invalid credentials"}), 401
    token = create_access_token(identity=user.id)
    return jsonify({"token": token, "user": {"id": user.id, "email": user.email, "disability_type": user.disability_type}})

@auth_bp.get("/me")
@jwt_required()
def me():
    uid = get_jwt_identity()
    user = User.query.get(uid)
    return jsonify({"id": user.id, "email": user.email, "disability_type": user.disability_type})

@auth_bp.put("/me")
@jwt_required()
def update_me():
    uid = get_jwt_identity()
    data = request.get_json() or {}
    user = User.query.get(uid)
    user.disability_type = data.get("disability_type", user.disability_type)
    db.session.commit()
    return jsonify({"id": user.id, "email": user.email, "disability_type": user.disability_type})