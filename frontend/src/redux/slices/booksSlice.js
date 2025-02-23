import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import createBookWithID from '../../utils/createBookWithID';
import { setError } from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
  isLoadingViaAPIMany: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      // Option 1
      return thunkAPI.rejectWithValue(error);
      // Option 2
      // throw error;
    }
  }
);

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return { ...state, books: [...state.books, action.payload] };
    },
    deleteBook: (state, action) => {
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavourite: (state, action) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) book.isFavourite = !book.isFavourite;
      });
    },
    resetAllBooks: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.pending, (state) => {
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWithID(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBook.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });

    //test
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoadingViaAPIMany = true;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoadingViaAPIMany = false;
      console.log(action.payload);
      action.payload.forEach((element) => {
        if (element?.title && element?.author) {
          state.books.push(createBookWithID(element, 'API'));
        }
      });
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.isLoadingViaAPIMany = false;
    });
  },
});

export const { addBook, deleteBook, toggleFavourite, resetAllBooks } =
  booksSlice.actions;
export const selectBooks = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;
export const selectIsLoadingViaAPIMany = (state) =>
  state.books.isLoadingViaAPIMany;
export default booksSlice.reducer;
