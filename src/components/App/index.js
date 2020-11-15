import './styles.css';

import { useCallback, useEffect, useState } from 'react';

import { getPhotos, searchPhotos } from '../../utils/unsplash_api';
import { getResultsText } from '../../utils/helpers';
import resultTypes from '../../constants/result_types';

import PhotoGallery from '../PhotoGallery';
import SearchBar from '../../components/SearchBar';

const App = () => {
  const [photoResults, setPhotoResults] = useState([]);
  const [resultsConfig, setResultsConfig] = useState({
    type: resultTypes.LATEST,
    lastFetchedPage: 1,
  })

  useEffect(() => {
    const fetchPhotos = async () => {
      const photosResponse = await getPhotos();
      setPhotoResults(photosResponse);
    }
    fetchPhotos();
  }, []);

  const fetchSearchPhotos = useCallback(async (query) => {
    const photosResponse = await searchPhotos(query);
    setPhotoResults(photosResponse);
    setResultsConfig({ type: resultTypes.SEARCH, query, lastFetchedPage: 1 });
  }, []);

  const fetchMorePhotos = async () => {
    const newFetchedPage = resultsConfig.lastFetchedPage + 1;
    if (resultsConfig.type === resultTypes.LATEST) {
      const photosResponse = await getPhotos(newFetchedPage);
      setPhotoResults([...photoResults, ...photosResponse]);
      setResultsConfig({
        type: resultTypes.LATEST,
        lastFetchedPage: newFetchedPage,
      });
    }
    if (resultsConfig.type === resultTypes.SEARCH) {
      const photosResponse = await searchPhotos(resultsConfig.query, newFetchedPage);
      // TODO: don't keep fetching if already at the last page
      setPhotoResults([...photoResults, ...photosResponse]);
      setResultsConfig({
        ...resultsConfig,
        type: resultTypes.SEARCH,
        lastFetchedPage: newFetchedPage,
      });
    }
  };

  return (
    <div className="App">
      <SearchBar searchPhotos={fetchSearchPhotos} />
      <h2 className="results-text">{getResultsText(resultsConfig)}</h2>
      <PhotoGallery photos={photoResults} />
      <button
        className="load-more-button"
        onClick={fetchMorePhotos}
        type="submit"
      >
        Load 10 more photos...
      </button>
    </div>
  );
};

export default App;
