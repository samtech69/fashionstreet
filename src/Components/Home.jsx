import React, { useEffect, useState } from 'react'
import Testimonials from './Testimonials'
import { useDispatch, useSelector } from 'react-redux'

import { getProduct } from "../Store/ActionCreaters/ProductAC"
import { Link } from 'react-router-dom'


export default function Home() {
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length) {
            setData(ProductStateData.slice(1).reverse().slice(0, 8))
        }
    }

    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length])
    return (
        <>
            <div className='Backg'>
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src="images/banner2.png" class="d-block w-100 imaaz" alt="..."/>
    </div>
    <div class="carousel-item">
    <img src="images/banner3.jpg" class="d-block w-100 imaaz" alt="..."/>

    </div>
    <div class="carousel-item">
    <img src="images/banner1.jpg" class="d-block w-100 imaaz" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


                {/* /////////////////////////////////////////// */}

                <div className="we-help-section">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-md-6">
                                <div className="imgs-grid">
                                    <div className="grid grid-1"><img src="images/womentops/top3a.jfif" alt="Untree.co" /></div>
                                    <div className="grid grid-2"><img src="images/tshirts/tshirt6a.jfif" alt="Untree.co" /></div>
                                    <div className="grid grid-3"><img src="images/kids/gkid2a.jfif" alt="Untree.co" /></div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h2 className="section-title text-dark">Why Choose Us</h2>
                                <p className='text-dark'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique.</p>

                                <div className="row my-5">
                                    <div className="col-6 col-md-6">
                                        <div className="feature nowbtn">
                                            <div className="icon ">
                                                <img src="images/truck.svg" alt="Image" className="imf-fluid " />
                                            </div>
                                            <h3 className='text-dark'>Fast &amp; Free Shipping</h3>
                                            <p className='text-dark'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6">
                                        <div className="feature">
                                            <div className="icon">
                                                <img src="images/bag.svg" alt="Image" className="imf-fluid" />
                                            </div>
                                            <h3 className='text-dark'>Easy to Shop</h3>
                                            <p className='text-dark'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                        </div>
                                    </div>

                                    <div className="col-6 col-md-6">
                                        <div className="feature">
                                            <div className="icon">
                                                <img src="images/support.svg" alt="Image" className="imf-fluid" />
                                            </div>
                                            <h3 className='text-dark'>24/7 Support</h3>
                                            <p className='text-dark'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                        </div>
                                    </div>

                                    <div className="col-6 col-md-6">
                                        <div className="feature">
                                            <div className="icon">
                                                <img src="images/return.svg" alt="Image" className="imf-fluid" />
                                            </div>
                                            <h3 className='text-dark'>Hassle Free Returns</h3>
                                            <p className='text-dark'>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
                                        </div>
                                    </div>
                                    <div className='nowbtn'>
                                        <button className='btn' ><span className="material-symbols-outlined">
                                            shopping_bag
                                        </span>Shop Now</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="blog-section">
                    <div className="container">
                        <div className="row mb-5">
                            <h2 className="text-center">Latest Products</h2>
                        </div>

                        <div className="row">
                            {
                                data.map((item, index) => {

                                    return <div key={index} className="product-section  col-md-3 mb-5">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Link className="product-item" to={`/product/${item.id}`}>
                                                        <img src={`/img/product/${item.pic1}`} className="img-fluid" style={{ borderRadius: "50px" }} />
                                                        <span className="icon-cross">
                                                            <h5 className='image-fluid'>Quick Add</h5>
                                                        </span>
                                                    </Link>
                                                    <div className='post-entry mt-3'>
                                                        <h5><p href="#" className='text-dark'>{item.name}</p></h5>
                                                        <div><p href="#" className='text-dark'><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice}<sup className='text-success'>%off</sup></p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>





                        <div className='nowbtn text-center'>
                            <a href='/shop/' className='btn w-50 btn-warning' >LOAD MORE</a>
                        </div>
                    </div>
                </div>

                {/* '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''' */}
                <Testimonials />
            </div>
        </>
    )
}
