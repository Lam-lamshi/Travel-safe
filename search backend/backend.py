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
    results=[]

    if not query:
        return jsonify({"results": []})

    for continent, countries in CONTINENTS.items():
        if query in continent:
            for country in countries:
                results.append({
                    "id":country["id"],
                    "name":country["name"],
                    "continents":continent
                })
                for country in countries:
                    if query in country ["name"].lower():
                        results.append({
                             "id":country["id"],
                                "name":country["name"],
                                "continents":continent
                            })
                        return jsonify({"results":results})



NEWS_API_KEY = "70c71b55d502440784e247f0dc276fc8"
@app.route("/news", methods=["GET"])
def news():
    url = (
        f"https://newsapi.org/v2/everything?"
        f"q=travel OR tourism&language=en&apiKey={NEWS_API_KEY}"
    ) 
    res = requests.get(url)
    return jsonify(res.json())




if __name__ == "__main__":
    app.run(debug=True)