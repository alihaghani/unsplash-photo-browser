import './styles.css';

import { filterPhotos } from '../../utils/filter';
import { useCallback, useEffect, useState } from 'react';

import { getPhotos, searchPhotos } from '../../utils/unsplash_api';
import { getResultsText, getSizeFilterTooltip } from '../../utils/helpers';
import resultTypes from '../../constants/result_types';

import FilterBar from '../FilterBar';
import PhotoGallery from '../PhotoGallery';
import SearchBar from '../../components/SearchBar';

const App = () => {
  const [photoStore, setPhotoStore] = useState([]);
  const [filteredPhotoStore, setFilteredPhotoStore] = useState(photoStore);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [resultsConfig, setResultsConfig] = useState({
    type: resultTypes.LATEST,
    lastFetchedPage: 1,
  })

  useEffect(() => {
    const fetchPhotos = async () => {
      const photosResponse = await getPhotos();
      setPhotoStore(photosResponse);
    }
    fetchPhotos();
  }, []);

  useEffect(() => {
    /**
     * This useEffect hook is invoked every time the photoStore or selectedFilters
     * are updated, ensuring all displayed photos pass the currently-selected filters.
     */
    const filteredPhotos = filterPhotos(photoStore, selectedFilters);
    setFilteredPhotoStore(filteredPhotos);
  }, [selectedFilters, photoStore])

  const updateFilters = (event) => {
    const { id, value} = event.target;
    setSelectedFilters({
      ...selectedFilters,
      [id]: value,
    })
  }

  const fetchSearchPhotos = useCallback(async (query) => {
    const photosResponse = await searchPhotos(query);
    setPhotoStore(photosResponse);
    setResultsConfig({ type: resultTypes.SEARCH, query, lastFetchedPage: 1 });
  }, []);

  const fetchMorePhotos = async () => {
    const newFetchedPage = resultsConfig.lastFetchedPage + 1;
    if (resultsConfig.type === resultTypes.LATEST) {
      const photosResponse = await getPhotos(newFetchedPage);
      setPhotoStore([...photoStore, ...photosResponse]);
      setResultsConfig({
        type: resultTypes.LATEST,
        lastFetchedPage: newFetchedPage,
      });
    }
    if (resultsConfig.type === resultTypes.SEARCH) {
      const photosResponse = await searchPhotos(resultsConfig.query, newFetchedPage);
      // TODO: don't keep fetching if already at the last page of results
      setPhotoStore([...photoStore, ...photosResponse]);
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
      <FilterBar selectedFilters={selectedFilters} updateFilters={updateFilters} />
      <h2 className="results-text">{getResultsText(resultsConfig, filteredPhotoStore)}</h2>
      <PhotoGallery photos={filteredPhotoStore} />
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
