import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import {
  addBook,
  fetchBook,
  fetchBooks,
  selectIsLoadingViaAPI,
  selectIsLoadingViaAPIMany,
} from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import createBookWithID from '../../utils/createBookWithID';
import booksData from '../../data/books.json';
import './BookForm.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const isLoadingViaAPI = useSelector(selectIsLoadingViaAPI);
  const isLoadingViaAPIMany = useSelector(selectIsLoadingViaAPIMany);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    //додавання до обєкту нового свойства
    const randomBookWithId = createBookWithID(randomBook, 'random');

    dispatch(addBook(randomBookWithId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      // dispatch action
      const book = createBookWithID({ title, author }, 'manual');
      dispatch(addBook(book));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('You must fill title and author!'));
    }
  };

  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
  };

  const handleAddSomeRandomBooksViaAPI = () => {
    dispatch(fetchBooks('http://localhost:4000/random-number-books-delayed'));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="title"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random
        </button>

        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoadingViaAPI}
        >
          {isLoadingViaAPI ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add Random via API'
          )}
        </button>
        <button
          type="button"
          disabled={isLoadingViaAPIMany}
          onClick={handleAddSomeRandomBooksViaAPI}
        >
          {isLoadingViaAPIMany ? (
            <>
              <span>Loading Books...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add 5 Random Books'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
