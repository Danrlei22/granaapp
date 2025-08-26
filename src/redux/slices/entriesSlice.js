import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEntries = createAsyncThunk(
  "entries/fetchEntries",
  async () => {
    const res = await fetch("http://localhost:5000/entries");

    return res.json();
  }
);

const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default entriesSlice.reducer;
