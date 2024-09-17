document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('categorySelect');
    const newsContainer = document.getElementById('newsContainer');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const loadingSpinner = document.getElementById('loadingSpinner');

    function fetchNews(category = 'general', keyword = '') {
        loadingSpinner.classList.remove('hidden');
        newsContainer.innerHTML = '';

        let apiUrl = `http://127.0.0.1:5000/news?category=${category}`;
        if (keyword) {
            apiUrl += `&q=${encodeURIComponent(keyword)}`;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayNews(data.articles);
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
            })
            .finally(() => {
                loadingSpinner.classList.add('hidden');
            });
    }

    function displayNews(articles) {
        if (articles.length === 0) {
            newsContainer.innerHTML = '<p>No news found. Try a different keyword or category.</p>';
        } else {
            articles.forEach(article => {
                const newsItem = document.createElement('div');
                newsItem.className = 'newsItem';
                newsItem.innerHTML = `
                    <img src="${article.urlToImage}" alt="${article.title}">
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                `;
                newsContainer.appendChild(newsItem);
            });
        }
    }

    categorySelect.addEventListener('change', function() {
        const selectedCategory = categorySelect.value;
        fetchNews(selectedCategory);
    });

    searchButton.addEventListener('click', function() {
        const keyword = searchInput.value.trim();
        const selectedCategory = categorySelect.value;
        fetchNews(selectedCategory, keyword);
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const keyword = searchInput.value.trim();
            const selectedCategory = categorySelect.value;
            fetchNews(selectedCategory, keyword); 
        }
    });

    fetchNews();
});
