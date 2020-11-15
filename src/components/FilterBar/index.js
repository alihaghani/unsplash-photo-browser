import './styles.css';

import { getSizeFilterTooltip } from '../../utils/helpers';
import { LABEL } from '../../utils/filter';
import likeFilterBounds from '../../constants/like_filter_bounds';
import sizeFilterBounds from '../../constants/size_filter_bounds';

const FilterBar = ({ updateFilters, selectedFilters }) => (
  <div className="filter-bar">
    <h4>Filters</h4>
    <select onChange={updateFilters} value={selectedFilters.size} id="size">
      <option value={LABEL} title="All images">Size (All)</option>
      {Object.values(sizeFilterBounds).map(sizeFilterBound => (
        <option
          key={sizeFilterBound.key}
          value={sizeFilterBound.key}
          title={getSizeFilterTooltip(sizeFilterBound)}
        >
          {sizeFilterBound.value}
        </option>
      ))}
    </select>
    <select onChange={updateFilters} value={selectedFilters.likes} id="likes">
      {Object.values(likeFilterBounds).map(likeFilterBound => (
        <option
          key={likeFilterBound.key}
          value={likeFilterBound.key}
        >
          {likeFilterBound.value}
        </option>
      ))}
    </select>
  </div>
)

export default FilterBar;
