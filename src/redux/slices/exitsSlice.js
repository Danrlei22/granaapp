import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchExits = createAsyncThunk("exits/fetchExits", async () => {
  const res = await fetch("http://localhost:5000/exits");

  return res.json();
});

const exitsSlice = createSlice({
  name: "exits",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExits.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchExits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default exitsSlice.reducer;
