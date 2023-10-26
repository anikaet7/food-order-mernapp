import React, { useState } from 'react'
import { Link } from "react-router-dom"
export default function Signup() {

    const [credentials, setCredentials] = useState({ email: "", name: "", password: "" });
    const handlechange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            }, body: JSON.stringify({

                email: credentials.email, name: credentials.name,
                password: credentials.password

            })

        })
        const json = response.json();
        console.log(json);
        // if (!json.success) {
        //     alert("enter valid credentials");


        // }
    }
    return (
        <div>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={handlechange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={handlechange} />

                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handlechange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                </form></div></div>
    )
}
