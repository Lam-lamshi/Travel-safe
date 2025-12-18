# backend.py

from flask import Flask, request, jsonify
from data import CONTINENTS
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  

@app.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "").lower().strip()

    if not query:
        return jsonify({"results": []})

    results = []
    seen = set()

    for continent, countries in CONTINENTS.items():
        if query in continent:
            for country in countries:
                if country["id"] not in seen:
                    results.append({
                        "id":country["id"],
                        "name":country["name"],
                        "continent":continent
                })
                seen.add(country["id"])
    for country in countries:
        if query in country ["name"].lower():
            if country["id"] not in seen:
                results.append({
                     "id":country["id"],
                    "name":country["name"],
                     "continent":continent
                })
                seen.add(country["id"])

    return jsonify({"results": results})




NEWS_API_KEY = "70c71b55d502440784e247f0dc276fc8"
@app.route("/news", methods=["GET"])
def news():
    try:
        
        url = "https://newsapi.org/v2/everything?"
        params={
            "q": "travel OR tourism",
                
                "language":"en",
                "pageSize":10,
                "apiKey": NEWS_API_KEY
        }
    
        response=requests.get(url,params=params,timeout=10)
        response.raise_for_status()

        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": "Failed to fetch news articles",
            "details": str(e)
        }),500




if __name__ == "__main__":
    app.run(debug=True)