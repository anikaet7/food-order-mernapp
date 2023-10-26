import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import { useState } from 'react';
import Modal from '../Modal';
import Card from './card';
import Cart from '../screens/Cart';
import { useCart } from './ContentReducer';

export default function Navbar() {
    let data = useCart();
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();
    const handlelogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");

    }
    return (

        <div ><nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fs-1 fdt-italic" to="/">Yo Food</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2">
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/">Home</Link>
                        </li>
                        {(localStorage.getItem("authToken")) ?
                            <Link className="nav-link " aria-current="page" to="/myOrder">My Orders</Link>
                            : ""}
                    </ul>

                    {(!localStorage.getItem("authToken")) ?
                        <div className="d-flex">
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>


                            <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                        </div>
                        :
                        <div>
                            <div className='btn bg-white text-success mx-2' onClick={() => setCartView(true)}>My Cart
                                <Badge pill bg="danger"> {data.length}</Badge></div>

                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}

                            <div className='btn bg-white text-danger mx-2' onClick={handlelogout}>Logout</div>
                        </div>}

                </div>
            </div>
        </nav ></div >
    )
}
