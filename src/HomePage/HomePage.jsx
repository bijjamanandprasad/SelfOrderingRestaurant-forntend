import { CssBaseline, Menu } from "@mui/material";
import React from "react";
import Navbar from '../Navbar/Navbar';
import SlideShow from "../SlideShow/SlideShow";
import Footer from "../Footer/Footer";
import MenuPage from "../MenuPage/MenuPage";


const App = () =>{
    return(
        <>
            <CssBaseline />
            
            <Navbar />
            <SlideShow />
            <MenuPage back='false' admin='false' />
            <Footer />
           
        </>
    ); 
}

export default App;