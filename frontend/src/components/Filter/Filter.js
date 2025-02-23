import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavouriteFilter,
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavouriteFilter,
  resetFilters,
} from '../../redux/slices/filterSlice';
import { resetAllBooks } from '../../redux/slices/booksSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter);

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };

  const handleAuthorFilterChange = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };

  const handleOnlyFavouriteFilterChange = () => {
    dispatch(setOnlyFavouriteFilter());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const handleResetAllBooks = () => {
    dispatch(resetAllBooks());
  };
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by author..."
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavouriteFilter}
              onChange={handleOnlyFavouriteFilterChange}
            />
            Only Favourite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
        <button type="button" className="red-btn" onClick={handleResetAllBooks}>
          Reset All Books
        </button>
      </div>
    </div>
  );
};

export default Filter;
