import Axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Foundation from './aroundME'
import Home from '../components/homepage/Homepage'
import Search from '../components/search/search'



import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

/*----------------------------------------------------------------------*/
function Homepage() {

    return (
        <>
            {/* <Link to="/login">Login</Link><br />
            <Link to="/register">Register</Link><br />
            <Link to="/Too_panjai">Too panjai</Link><br /> */}
            {/* <Foundation/> */}
            <Home/>
            {/* <Search/> */}
        </>
           
    )
}

export default Homepage;