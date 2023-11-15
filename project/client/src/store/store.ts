import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import { persistReducer, persistStore } from "redux-persist";
import session from "redux-persist/lib/storage/session";

// session storage에 저장하기 위한 persist 설정
const persistConfig = {
  key: "auth",
  storage: session,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
