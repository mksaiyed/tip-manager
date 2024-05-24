import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import CalculateTip from "./components/CalculateTip";
import TipRecords from "./components/TipRecords";
import "./App.css";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(localStorage.getItem("name"));

    return (
        <div className="App">
            <header className="App-header">
                <h1>Tip Manager</h1>
            </header>
            <main>
                {!token ? (
                    <>
                        <div className="flex">
                            <Register setToken={setToken} setUser={setUser} />
                            <Login setToken={setToken} setUser={setUser} />
                        </div>
                    </>
                ) : (
                    <>
                        <h2>Welcome, {user}</h2>
                        <div className="flex">
                            <CalculateTip token={token} />
                            <TipRecords token={token} />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default App;
