 # backend/app/routes/navigation.py
import requests
from flask import Blueprint, request, jsonify, current_app

navigation_bp = Blueprint("navigation", __name__)

@navigation_bp.get("/route")
def route():
    origin = request.args.get("origin")
    destination = request.args.get("destination")
    wheelchair = request.args.get("wheelchair") == "true"
    if not origin or not destination:
        return jsonify({"error": "origin and destination are required"}), 400

    # Use walking as a proxy for avoiding stairs for mobility; adjust as needed
    mode = "walking" if wheelchair else "driving"
    api_key = current_app.config.get("GOOGLE_MAPS_API_KEY", "")
    if not api_key:
        # Minimal stub without API key
        return jsonify({"polyline": None, "mode": mode, "note": "No API key configured"}), 200

    params = {"origin": origin, "destination": destination, "mode": mode, "key": api_key}
    url = "https://maps.googleapis.com/maps/api/directions/json"
    try:
        resp = requests.get(url, params=params, timeout=10)
        data = resp.json()
        routes = data.get("routes", [])
        polyline = routes[0]["overview_polyline"]["points"] if routes else None
        return jsonify({"polyline": polyline, "mode": mode})
    except Exception:
        return jsonify({"polyline": None, "mode": mode}), 200
# backend/wsgi.py
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)