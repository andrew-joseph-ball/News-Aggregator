from flask import Flask, jsonify,request, render_template
from flask_restful import Api, Resource
import requests

app = Flask(__name__)
api = Api(app)

NEWS_API_KEY = ''
NEWS_API_URL = 'https://newsapi.org/v2/top-headlines'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/news', methods=['GET'])
def get_news():
    category = request.args.get('category', 'general')
    keyword = request.args.get('q', '')
    params = {
        'apiKey': NEWS_API_KEY,
        'category': category,
        'country': 'us',
    }

    if keyword:
        params['q'] = keyword

    response = requests.get(NEWS_API_URL, params=params)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)