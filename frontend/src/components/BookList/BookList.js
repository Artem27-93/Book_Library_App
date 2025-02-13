import { useSelector, useDispatch } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import { deleteBook, toggleFavourite } from '../../redux/books/actionCreators';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    //delete book
    console.log(id);
    dispatch(deleteBook(id));
  };

  const handleToggleFavourite = (id) => {
    dispatch(toggleFavourite(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available!</p>
      ) : (
        <ul>
          {books.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book-info">
                  {++i}. {book.title} by {book.author}
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
