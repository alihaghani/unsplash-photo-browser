import resultTypes from '../constants/result_types';

export const getResultsText = (resultsConfig, filteredPhotos) => {
  if (filteredPhotos.length === 0) {
    return 'No photos found.'
  }
  if (resultsConfig.type === resultTypes.LATEST) {
    return 'Latest photos...';
  }
  if (resultsConfig.type === resultTypes.SEARCH) {
    return `Results for "${resultsConfig.query}"...`;
  }
}

export const getSizeFilterTooltip = ({ lower, upper }) => (
  `Images with a width or height between ${lower}px and ${upper}px`
);
