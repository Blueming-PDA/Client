import { combineReducers, createStore } from "redux";
import userReducer from "./reducers/user";

import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    user: userReducer,
  })
);

// export default createStore(rootReducer);
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);
export { store, persistor };
export default store;
