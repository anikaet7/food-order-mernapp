import React from 'react';
import './App.css';
import Home from './screens/home';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {
    BrowserRouter as Router,
    Routes,
    Route,

} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContentReducer';
import MyOrder from './screens/MyOrder';
function App() {

    return (
        <CartProvider>
            <Router>
                <div>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<Signup />} />
                        <Route exact path="/myOrder" element={<MyOrder />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>


    )
}

export default App;