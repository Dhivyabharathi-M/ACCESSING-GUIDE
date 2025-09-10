# backend/app/__init__.py
from flask import Flask, jsonify
from flask_cors import CORS
from .config import Config
from .extensions import db, jwt

def create_app() -> Flask:
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    from .routes.auth import auth_bp
    from .routes.bookings import bookings_bp
    from .routes.places import places_bp
    from .routes.navigation import navigation_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(bookings_bp, url_prefix="/api/bookings")
    app.register_blueprint(places_bp, url_prefix="/api/places")
    app.register_blueprint(navigation_bp, url_prefix="/api/navigation")

    @app.route("/api/health")
    def health():
        return jsonify({"status": "ok"})

    with app.app_context():
        db.create_all()

    return app