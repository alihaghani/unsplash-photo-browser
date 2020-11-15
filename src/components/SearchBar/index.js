import './styles.css';

import { useCallback, useState } from 'react';

const SearchBar = ({ searchPhotos }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchSubmitHandler = useCallback(() => {
    searchPhotos(searchQuery);
  }, [searchQuery]);

  const searchQueryChangeHandler = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      searchSubmitHandler();
    }
  }, [searchQuery]);

  return (
    <div className="search-bar">
      <input
        autoFocus
        className="input"
        onChange={searchQueryChangeHandler}
        onKeyDown={handleKeyDown}
        onSubmit={searchSubmitHandler}
        placeholder="Search photos..."
        type="text"
        value={searchQuery}
      />
      <button onClick={searchSubmitHandler} type="submit">Go</button>
    </div>
  );
};

export default SearchBar;
