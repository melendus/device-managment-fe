import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import appRoutes from "./routes/appRoutes";
import ErrorPage from "./pages/ErrorPage";
import DashboardPageLayout from "./pages/dashboard/DashboardPageLayout";
import QuestionsPage from "./pages/questions/QuestionsPage";
import UserProfilesPage from "./pages/userProfile/UserProfilesPage";
import UserProfilePage from "./pages/userProfile/UserProfilePage";
import QuestionPage from "./components/common/question/QuestionPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/dashboard",
        element: <DashboardPageLayout />,
      },
      {
        path: "/questions",
        element: <QuestionsPage />,
      },
      {
        path: "/profiles",
        element: <UserProfilesPage />,
      },
      {
        path: "/signIn",
        element: <DashboardPageLayout />, //doesn't matter what I put here
      },
      {
        path: "/userProfile",
        element: <UserProfilePage />,
      },
      {
        path: "/question",
        element: <QuestionPage />,
      },
    ],
  },
]);

let persistor = persistStore(store);
root.render(
  // <React.StrictMode>
  //   <Provider store={store}>
  //     <CssBaseline />
  //     <App />
  //   </Provider>
  // </React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
