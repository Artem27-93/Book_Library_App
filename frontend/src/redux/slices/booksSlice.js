import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import createBookWithID from '../../utils/createBookWithID';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload];
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavourite: (state, action) => {
      return state.map((book) => {
        return book.id === action.payload
          ? { ...book, isFavourite: !book.isFavourite }
          : book;
      });
    },
  },
});

export const { addBook, deleteBook, toggleFavourite } = booksSlice.actions;
export const thunkFunction = async (dispatch, getState) => {
  // async action
  try {
    const res = await axios.get('http://localhost:4000/random-book');
    if (res?.data?.title && res?.data?.author) {
      dispatch(addBook(createBookWithID(res.data, 'API')));
    }
    console.log(res);
  } catch (error) {
    console.log('Error fetching random book', error);
  }
};
export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
