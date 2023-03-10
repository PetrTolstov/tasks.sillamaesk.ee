import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Main from "./pages/Main";
import CheckIfUserSignIn from './firebase/services/checkIfUserSignIn';
import Workers from "./pages/Workers/Workers";
import Teams from "./pages/Teams/Teams";
import Notifications from "./pages/Notifications/Notifications";
import Archive from "./pages/Archive/Archive";

function App() {

    if(localStorage.getItem("isLoggedIn")){
        CheckIfUserSignIn()
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path={"/Teams"} element={<Teams />} />
                    <Route path={"/ForAll"} element={<Notifications />} />
                    <Route path={"/Workers"} element={<Workers/>} />
                    <Route path={"/Archive"} element={<Archive/>} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
