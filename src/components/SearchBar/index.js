import './styles.css';

import { useCallback, useState } from 'react';

const SearchBar = ({ searchPhotos }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryChangeHandler = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, [])

  const searchSubmitHandler = useCallback(() => {
    searchPhotos(searchQuery);
  }, [searchQuery])

  return (
    <div className="search-bar">
      <input
        autoFocus
        className="input"
        onChange={searchQueryChangeHandler}
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
