import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import userReducer from "./userStore";
import vocabReducer from "./vocabStore";

const authMiddleware = () => (next) => (action) => {
  if (
    action.type === "user/login" &&
    action.payload.isAuthenticated !== undefined
  ) {
    console.warn("Unauthorized attempt to set isAuthenticated");
    return;
  }
  const result = next(action);
  return result;
};

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

// Combine reducers
const reducer = combineReducers({
  user: userReducer,
  vocab: vocabReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // eslint-disable-next-line no-undef
    }).concat(authMiddleware),
});

export default store;
