import { useSelector, useDispatch } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import {
  deleteBook,
  toggleFavourite,
  selectBooks,
} from '../../redux/slices/booksSlice.js';

import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavouriteFilter,
} from '../../redux/slices/filterSlice';
import './BookList.css';

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavouriteFilter = useSelector(selectOnlyFavouriteFilter);
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    //delete book
    console.log(id);
    dispatch(deleteBook(id));
  };

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavourite = onlyFavouriteFilter ? book.isFavourite : true;
    return matchesTitle && matchesAuthor && matchesFavourite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');
    console.log(text.split(regex));
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available!</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++i}. {highlightMatch(book.title, titleFilter)} by{' '}
                  {highlightMatch(book.author, authorFilter)}
                </div>
                <div className="book-actions">
                  <span onClick={() => handleToggleFavourite(book.id)}>
                    {book.isFavourite ? (
                      <BsBookmarkStarFill className="star-icon" />
                    ) : (
                      <BsBookmarkStar className="star-icon" />
                    )}
                  </span>

                  <button onClick={() => handleDeleteBook(book.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BookList;
