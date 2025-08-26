import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import menuReducer from "./slices/menuSlice";
import motivationalReducer from "./slices/motivationalSlice";
import entriesReducer from "./slices/entriesSlice";
import exitsReducer from "./slices/exitsSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    menu: menuReducer,
    motivational: motivationalReducer,
    entries: entriesReducer,
    exits: exitsReducer,
  },
});

export default store;
