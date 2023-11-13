import { configureStore } from "@reduxjs/toolkit";
import appStateSlice from "./features/appStateSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../redux/slices/UserSlice";
import questionReducer from "../redux/slices/QuestionSlice";
import clickUserReducer from "../redux/slices/ClickedUserSlice";
import clickDeviceReducer from "../redux/slices/ClickedDeviceSlice";
import deviceReducer from "../redux/slices/DeviceSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistReducerCurrentUser = persistReducer(persistConfig, userReducer);
const persistReducerCurrentQuestion = persistReducer(
  persistConfig,
  questionReducer
);

export const store = configureStore({
  reducer: {
    appState: appStateSlice,
    currentUser: persistReducerCurrentUser,
    currentQuestion: persistReducerCurrentQuestion,
    clickedUser: clickUserReducer,
    clickedDevice: clickDeviceReducer,
    devices: deviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
