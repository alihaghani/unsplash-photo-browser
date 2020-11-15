import resultTypes from '../constants/result_types';

export const getResultsText = (resultsConfig) => {
  if (resultsConfig.type === resultTypes.LATEST) {
    return 'Latest photos...';
  }
  if (resultsConfig.type === resultTypes.SEARCH) {
    return `Results for "${resultsConfig.query}"...`;
  }
}
