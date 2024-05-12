import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoReducer from "../features/todoSlice";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, todoReducer);
const store = configureStore({ reducer: persistedReducer }); // Create store with persisted reducer
const persistor = persistStore(store); // Pass the store to persistStore

export { store, persistedReducer, persistor };
