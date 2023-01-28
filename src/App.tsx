import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main";
import CheckIfUserSignIn from './firebase/services/checkIfUserSignIn';
import Workers from "./pages/Workers/Workers";

function App() {

    if(localStorage.getItem("isLoggedIn")){
        CheckIfUserSignIn()
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path={"/Team"} element={<Main />} />
                    <Route path={"/ForAll"} element={<Main />} />
                    <Route path={"/Workers"} element={<Workers/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
