import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import menuReducer from "./slices/menuSlice";
import motivationalReducer from "./slices/motivationalSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    menu: menuReducer,
    motivational: motivationalReducer,
  },
});

export default store;
