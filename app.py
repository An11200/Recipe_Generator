from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

API_KEY = 'c1543076938f4ab28be885a7018de44d'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search-recipes', methods=['POST'])
def search_recipes():
    data = request.get_json()
    ingredients = data.get('ingredients', '')
    diet = data.get('diet', '')
    cuisine = data.get('cuisine', '')

    # Prepare the API request
    api_url = f'https://api.spoonacular.com/recipes/complexSearch'
    params = {
        'apiKey': API_KEY,
        'includeIngredients': ingredients,
        'diet': 'vegetarian' if diet == 'vegetarian' else None,
        'cuisine': cuisine,
        'number': 5  # Number of recipes to return
    }

    response = requests.get(api_url, params=params)

    if response.status_code == 200:
        recipes = response.json().get('results', [])
        return jsonify(recipes)
    else:
        return jsonify({'error': 'Failed to fetch recipes'}), response.status_code

if __name__ == '__main__':
    app.run(debug=True)
