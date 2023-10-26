import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import Card from '../components/card'
import Carousal from '../components/carousal'
import Badge from "@material-ui/core/Badge";

export default function Home() {
    const [search, setSearch] = useState('')

    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFooditem] = useState([]);


    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            }
        })

        response = await response.json();
        setFooditem(response[0]);
        setFoodCat(response[1]);

    }


    useEffect(() => {
        loadData()
    }, [])


    return (
        <div>
            <div><Navbar /></div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                <div className="carousel-inner" >

                    <div className="carousel-caption" style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center" >
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            {/* <button className="btn btn-outline-success text-white bg-dark" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active" data-bs-interval="10000" >
                        <img src="https://source.unsplash.com/random/900x700/?pizza " style={{ maxHeight: "500px", filter: "brightnexx(30%)" }} className="d-block w-100" alt="..." />
                        <nav class="navbar navbar-light bg-light">

                        </nav>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" style={{ maxHeight: "500px", filter: "brightnexx(30%)" }} className="d-block w-100" alt="..." />

                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?waffle" style={{ maxHeight: "500px", filter: "brightnexx(30%)" }} className="d-block  w-100" alt="..." />


                    </div>
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button></div>


            <div className='container'>
                {
                    foodCat != []

                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3 '>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {foodItem != []
                                        ? foodItem.filter((item) => item.CategoryName == data.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                            .map(filterItems => {
                                                return (
                                                    <div className='col-12 col-md-6 col-lg-3' key={filterItems._id}>
                                                        <Card foodItem={filterItems}
                                                            options={filterItems.options[0]}
                                                        ></Card>
                                                    </div>
                                                )
                                            }
                                            )

                                        : <div>"No such data"</div>}
                                </div>

                            )
                        })
                        : <div> "'"""""""</div>

                }



            </div>
            <div><Footer /></div>
        </div>
    )
}


