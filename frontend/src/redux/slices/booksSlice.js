import { createSlice } from '@reduxjs/toolkit';

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
export const selectBooks = (state) => state.books;

export default booksSlice.reducer;
