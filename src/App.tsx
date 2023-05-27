import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import SignInPage from "./pages/logIn/LogInPage";

function App() {
  // const router = createBrowserRouter([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken != null) {
      setToken(localStorageToken);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <Route path="/signIn" element={<SignInPage setToken={setToken} />} />
        ) : (
          <Route element={<MainLayout />}>{routes}</Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
