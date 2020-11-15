import httpMethods from '../constants/http_methods';
import { UNSPLASH_ACCESS_KEY } from '../config';

const UNSPLASH_API_URL = 'https://api.unsplash.com';

const unsplashAuthHeader = { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` };

/**
 * Get photos from Unsplash /photos API endpoint.
 * API docs: https://unsplash.com/documentation#list-photos
 * @param {Number} [pageNumber = 1]: page number to retrieve
 * @param {Number} [perPage = 10]: number of photos to include per page
 * @param {String} [orderBy = 'latest']: how to sort the photos ('latest', 'oldest', or 'popular')
 * @return {Promise<[Object]>}: response from the API endpoint
 */
export const getPhotos = async (pageNumber = 1, perPage = 10, orderBy = 'latest') => {
  const response = await fetch(`${UNSPLASH_API_URL}/photos?` + new URLSearchParams({
    page: pageNumber,
    per_page: perPage,
    order_by: orderBy,
  }), {
    method: httpMethods.GET,
    headers: {...unsplashAuthHeader},
  });
  return response.json();
};

/**
 * Search photos from Unsplash /search/photos endpoint.
 * API docs: https://unsplash.com/documentation#search-photos
 * @param {String} query: search query
 * @param {Number} [pageNumber = 1]: page number to retrieve
 * @param {Number} [perPage = 10]: number of photos to include per page
 * @param {String} [orderBy = 'latest']: how to sort the photos ('relevant' or 'latest')
 * @return {Promise<[Object]>}: search results from the API endpoint
 */
export const searchPhotos = async (
  query,
  pageNumber = 1,
  perPage = 10,
  orderBy = 'relevant',
) => {
  const response = await fetch(`${UNSPLASH_API_URL}/search/photos?` + new URLSearchParams({
    query,
    page: pageNumber,
    per_page: perPage,
    order_by: orderBy,
  }), {
    method: httpMethods.GET,
    headers: {...unsplashAuthHeader},
  });

  const responseJson = await response.json();
  return responseJson.results;
};
