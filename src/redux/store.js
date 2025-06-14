import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    menu: menuReducer
  },
});

export default store;