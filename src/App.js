import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import MenuPage from "./MenuPage/MenuPage";
import CartPage from "./CartPage/CartPage";
import AdminPage from "./AdminPage/AdminPage";
import AdminSignin from "./AdminPage/AdminSignin";
import AdminRegistation from "./AdminPage/AdminRegistration";
import AdminAddUser from "./AdminPage/AdminAddUser";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () =>{ 
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/adminsignin' element={<AdminSignin />} />
                <Route path='/adminregistration' element={<AdminRegistation />} />
                <Route path='/adminadduser' element={<AdminAddUser />} />

                <Route path='/' element={<HomePage />} />
                <Route path='/menu' element={<MenuPage />} />
                <Route path='/cart' element={<CartPage />} />
            </Routes>
        </BrowserRouter>
    ); 
}

export default App;
