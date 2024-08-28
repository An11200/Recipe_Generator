document.getElementById('recipe-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const ingredients = document.getElementById('ingredients').value;
    const diet = document.getElementById('diet').value;
    const cuisine = document.getElementById('cuisine').value;

    try {
        const response = await fetch('/search-recipes', {  // Use relative URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients, diet, cuisine }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const recipes = await response.json();

        // Display recipes
        const resultsDiv = document.getElementById('recipe-results');
        resultsDiv.innerHTML = ''; // Clear previous results
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `<h3>${recipe.title}</h3>
                                    <img src="${recipe.image}" alt="${recipe.title}" />
                                    <p>${recipe.summary || ''}</p>`;
            resultsDiv.appendChild(recipeCard);
        });
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

