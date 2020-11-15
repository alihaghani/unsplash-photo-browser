import likeFilterBounds from '../constants/like_filter_bounds';
import sizeFilterBounds from '../constants/size_filter_bounds';

export const LABEL = '__LABEL';

const doesPhotoPassSizeFilter = (photo, selectedFilters) => {
  const sizeFilter = selectedFilters.size;

  // no filter is selected, everything passes
  if (!sizeFilter || sizeFilter === LABEL) return true;
  const sizeBounds = sizeFilterBounds[sizeFilter];
  return (
    (
      photo.width > sizeBounds.lower
      && photo.width < sizeBounds.upper
    ) || (
      photo.height > sizeBounds.lower
      && photo.height < sizeBounds.upper
    )
  );
};

const doesPhotoPassLikesFilter = (photo, selectedFilters) => {
  const likesFilter = selectedFilters.likes;

  // no filter is selected, everything passes
  if (!likesFilter) return true;
  console.log(photo.likes);
  const likeBound = likeFilterBounds[likesFilter];
  return photo.likes > likeBound.lower;
}

export const doesPassFilters = (photo, selectedFilters) => (
  doesPhotoPassSizeFilter(photo, selectedFilters)
  && doesPhotoPassLikesFilter(photo, selectedFilters)
);

export const filterPhotos = (photos, selectedFilters) => (
  photos.filter(photo => doesPassFilters(photo, selectedFilters))
);
