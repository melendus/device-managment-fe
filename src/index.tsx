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
import DevicesPage from "./pages/questions/DevicesPage";
import UserProfilesPage from "./pages/userProfile/UserProfilesPage";
import UserProfilePage from "./pages/userProfile/UserProfilePage";
import QuestionPage from "./components/common/question/QuestionPage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import PageWrapperRole from "./components/common/PageWrapper";

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
        path: "/devices",
        element: <DevicesPage />,
      },
      {
        path: "/users",
        element: (
          <PageWrapperRole role="admin">
            <UserProfilesPage />
          </PageWrapperRole>
        ),
      },
      {
        path: "/signIn",
        element: <DashboardPageLayout />, //doesn't matter what I put here
      },
      {
        path: "/restricted",
        element: (
          <div>
            <b>THIS IS A RESTRICTED PAGE</b>
          </div>
        ),
      },
    ],
  },
]);

let persistor = persistStore(store);
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

reportWebVitals();
