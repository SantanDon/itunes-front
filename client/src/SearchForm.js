import React, { useState } from 'react';
import axios from 'axios';
import './styles/style.css'; // Import the CSS file

const SearchForm = () => {
  const [term, setTerm] = useState('');
  const [media, setMedia] = useState('all');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(''); // State for error messages

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before new search
    try {
      const response = await axios.get('http://localhost:3000/api/search', {
        params: { term, media },
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.'); // Set error message
    }
  };

  const toggleFavorite = (item) => {
    if (favorites.some(fav => fav.trackId === item.trackId)) {
      setFavorites(favorites.filter(fav => fav.trackId !== item.trackId));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search term"
        />
        <select value={media} onChange={(e) => setMedia(e.target.value)}>
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="podcast">Podcasts</option>
          <option value="music">Music</option>
          <option value="audiobook">Audiobooks</option>
          <option value="shortFilm">Short Films</option>
          <option value="tvShow">TV Shows</option>
          <option value="software">Software</option>
          <option value="ebook">eBooks</option>
        </select>
        <button type="submit">Search</button>
      </form>

      {/* Display error message if there's an error */}
      {error && <p className="error-message">{error}</p>}

      <div className="results">
        <h2>Results</h2>
        <ul>
          {results.map((item) => (
            <li key={item.trackId || item.collectionId}>
              {item.trackName || item.collectionName}
              <button onClick={() => toggleFavorite(item)}>
                {favorites.some(fav => fav.trackId === item.trackId) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="favorites">
        <h2>Favorites</h2>
        <ul>
          {favorites.map((item) => (
            <li key={item.trackId || item.collectionId}>
              {item.trackName || item.collectionName}
              <button onClick={() => toggleFavorite(item)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchForm;
