import React, { useState } from 'react';
import axios from 'axios';

interface SearchCriteria {
  title: string;
  yearStartDate: string;
  yearEndDate: string;
  mediaType: string;
}

const NavBar: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    title: '',
    yearStartDate: '',
    yearEndDate: '',
    mediaType: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get('https://api.example.com/search', {
        params: searchCriteria
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="navbar">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={searchCriteria.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="yearStartDate">Start Year</label>
          <input
            type="text"
            id="yearStartDate"
            name="yearStartDate"
            value={searchCriteria.yearStartDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="yearEndDate">End Year</label>
          <input
            type="text"
            id="yearEndDate"
            name="yearEndDate"
            value={searchCriteria.yearEndDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="mediaType">Media Type</label>
          <select
            id="mediaType"
            name="mediaType"
            value={searchCriteria.mediaType}
            onChange={handleChange}
          >
            <option value="">Select Media Type</option>
            <option value="book">Book</option>
            <option value="movie">Movie</option>
            <option value="music">Music</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>

      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((result: any) => (
            <div key={result.id} className="search-result-item">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
              <img src={result.imageUrl} alt={result.title} />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default NavBar;
