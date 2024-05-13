from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load movie data
movie_data = pd.read_csv("movies.csv")

# Preprocess data
selected_features = ['genres', 'keywords', 'tagline', 'cast', 'director']
for feature in selected_features:
    movie_data[feature] = movie_data[feature].fillna('')

combined_features = movie_data['genres'] + ' ' + movie_data['keywords'] + ' ' + movie_data['tagline'] + ' ' + movie_data['cast'] + ' ' + movie_data['director']

vectorizer = TfidfVectorizer()
feature_vectors = vectorizer.fit_transform(combined_features)
similarity = cosine_similarity(feature_vectors)

@app.route('/recommend', methods=['POST'])
def recommend_movies():
    movie_name = request.json.get('movieName')
    # movie_name = "frozen"
    
    # Find closest match to user input
    find_close_match = difflib.get_close_matches(movie_name, movie_data['title'].tolist())
    close_match = find_close_match[0] if find_close_match else None
    
    if close_match:
        index_of_the_movie = movie_data[movie_data['title'] == close_match].index[0]
        similarity_score = list(enumerate(similarity[index_of_the_movie]))
        sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)
        
        recommended_movies = []
        for movie in sorted_similar_movies[:10]:  
            index = movie[0]
            title_from_index = movie_data.loc[index, 'title']
            recommended_movies.append(title_from_index)
            # movie_id = int(movie_data.loc[index, 'id'])  
            # movie_runtime = int(movie_data.loc[index, 'runtime'])  
            # movie_tagline = (movie_data.loc[index, 'tagline'])  
            # movie_director = (movie_data.loc[index, 'director'])  
            # movie_cast = (movie_data.loc[index, 'cast'])  
            # movie_popularity = int(movie_data.loc[index, 'popularity'])  
            # movie_genres = (movie_data.loc[index, 'genres'])  
            # movie_homepage = (movie_data.loc[index, 'homepage'])  

            # movie_release_date = (movie_data.loc[index, 'release_date'])  
            # recommended_movies.append({"id": movie_id, "title": title_from_index,"runtime":movie_runtime,"tagline":movie_tagline, "director":movie_director, "movie_cast":movie_cast,"popularity":movie_popularity,"genres":movie_genres,"release_date":movie_release_date,"homepage":movie_homepage })

            # title_from_index = movie_data.loc[index, 'title']
            # movie_id = int(movie_data.loc[index, 'id'])  
            # movie_tagline = (movie_data.loc[index, 'tagline'])  
            # movie_cast = (movie_data.loc[index, 'cast'])  
            # recommended_movies.append({"id": movie_id, "title": title_from_index,"tagline":movie_tagline,"movie_cast":movie_cast })
    else:
        recommended_movies = []

    return jsonify(recommended_movies)


@app.route('/<int:movie_id>', methods=['GET'])
def get_movie_info(movie_id):
    movie_row = movie_data[movie_data['id'] == movie_id].to_dict(orient='records')
    if movie_row:
        return jsonify(movie_row[0])
    else:
        return jsonify({'error': 'Movie not found'}), 404

@app.route('/search', methods=['GET'])
def search_movies():
    search_query = request.args.get('query', '')
    
    if not search_query:
        return jsonify({'error': 'Search query not provided'}), 400
    
    # Find movies with titles similar to the search query
    similar_titles = difflib.get_close_matches(search_query, movie_data['title'], cutoff=0.5)
    
    if not similar_titles:
        return jsonify({'error': 'No matching movies found'}), 404
    
    # Return the list of similar movie titles as recommendations
    return jsonify(similar_titles)


if __name__ == '__main__':
    app.run(debug=True)
