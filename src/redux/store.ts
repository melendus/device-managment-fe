import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../redux/slices/UserSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistReducerCurrentUser = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    currentUser: persistReducerCurrentUser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
