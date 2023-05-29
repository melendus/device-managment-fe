import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import SignInPage from "./pages/logIn/LogInPage";
import Sidebar from "./components/common/sidebars/Sidebar";
import Container from "@mui/material/Container";
import SidebarNav from "./components/common/sidebars/SidebarNav";

function App() {
  // const router = createBrowserRouter([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken != null) {
      setToken(localStorageToken);
    }
  }, [token]);

  if (!token) {
    return <SignInPage setToken={setToken} />;
  }

  return <MainLayout setToken={setToken} />;
}

export default App;
