# backend.py

from flask import Flask, request, jsonify
from data import destinations
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "").lower()

    if not query:
        return jsonify({"results": []})

    results = []

    for d in destinations:
        if (
            query in d["name"].lower()
            or query in d["country"].lower()
            or query in d["region"].lower()
        ):
            results.append(d)

    return jsonify({"results": results})
@app.route("/destination/<int:dest_id>", methods=["GET"])
def get_destination(dest_id):
    for d in destinations:
        if d["id"] == dest_id:
            return jsonify(d)
    return jsonify({"error": "Destination not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)

import requests
NEWS_API_KEY = "70c71b55d502440784e247f0dc276fc8"
@apps.route("/news")
def news():
    url = (
        f"https://newsapi.org/v2/everything?"
        f"q=travel OR tourism&language=en&apiKey={NEWS_API_KEY}"
    ) 
    res = requests.get(url)
    return res.json()
