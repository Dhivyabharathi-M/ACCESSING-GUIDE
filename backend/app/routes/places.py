# backend/app/routes/places.py
import os
import requests
from flask import Blueprint, request, jsonify, current_app
from ..extensions import db
from ..models import Place

places_bp = Blueprint("places", __name__)

@places_bp.get("/search")
def search_places():
    query = request.args.get("query", "")
    wheelchair = request.args.get("wheelchair_access") == "true"
    ramps = request.args.get("ramps") == "true"
    toilet = request.args.get("accessible_toilet") == "true"

    # Local curated places (optional)
    local = Place.query
    if wheelchair: local = local.filter_by(wheelchair_access=True)
    if ramps: local = local.filter_by(ramps=True)
    if toilet: local = local.filter_by(accessible_toilet=True)
    local_results = [
        {
            "source": "local",
            "name": p.name,
            "address": p.address,
            "place_id": p.google_place_id,
            "wheelchair_access": p.wheelchair_access,
            "ramps": p.ramps,
            "accessible_toilet": p.accessible_toilet,
        } for p in local.limit(10).all()
    ]

    api_key = current_app.config.get("GOOGLE_MAPS_API_KEY", "")
    external_results = []
    if api_key and query:
        params = {"input": query, "inputtype": "textquery", "fields": "place_id,name,formatted_address", "key": api_key}
        url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
        try:
            resp = requests.get(url, params=params, timeout=8)
            data = resp.json()
            for c in data.get("candidates", []):
                external_results.append({
                    "source": "google",
                    "name": c.get("name"),
                    "address": c.get("formatted_address"),
                    "place_id": c.get("place_id"),
                    "wheelchair_access": wheelchair,
                    "ramps": ramps,
                    "accessible_toilet": toilet,
                })
        except Exception:
            pass

    return jsonify(local_results + external_results)
