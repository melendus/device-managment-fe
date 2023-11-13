import React, {useEffect, useState} from "react";
import MainLayout from "./components/layout/MainLayout";
import SignInPage from "./pages/logIn/LogInPage";

function App() {
    const [token, setToken] = useState("");

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");

        if (localStorageToken != null) {
            setToken(localStorageToken);
        }
    }, [token]);

    if (!token) {
        return <SignInPage setToken={setToken}/>;
    }

    return <MainLayout setToken={setToken}/>;
}

export default App;
