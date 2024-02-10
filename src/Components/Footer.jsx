import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    let [email, setEmail] = useState("")
    let [show, setShow] = useState(false)
    let [message, setMessage] = useState("")
    async function postData() {
        let response = await fetch("/newsletter", {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let item = response.find((x) => x.email === email)
        setShow(true)
        if (item) {
            setMessage("Your Email Address is already registered wih us")
        }
        else {
            response = await fetch("/newsletter", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email: email })
            })
            response = await response.json()
            setMessage("Thanks to register your email address with us Now we will send Emails Regarding our Latest Products and Deals.")
            setEmail("")
        }
    }
    return (
        <>

            <footer className="footer-section bordertop">
                <div className="container relative">

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="subscription-form">

                                {
                                    show ?
                                        <p className='text-light'>{message}</p>
                                        : ""
                                }
                                <h3 className="d-flex align-items-center text-warning"><span className="me-1"><span class="material-symbols-outlined">
                                    mail
                                </span></span><span>Subscribe to Newsletter</span></h3>

                                <div className="col-md-auto">
                                    <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your email" />
                                    <button className="btn text-light" onClick={postData}>Subscribe&nbsp;
                                        <span className="fa fa-paper-plane text-warning"></span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row g-5 mb-5">
                        <div className="col-lg-4">
                            <div className="mb-4 footer-logo-wrap "><Link href="#" className="footer-logo text-light" style={{ fontFamily: 'Dancing Script', fontSize: '50px' }}>fashion[street]</Link></div>
                            <p className="mb-4 text-light">You can send Gift to your loved ones with fastest Delivery Partners our shop will provide you full Support.</p>

                            <ul className="list-unstyled custom-social">
                                <li><Link href="#"><span className="fa fa-brands fa-facebook-f text-dark"></span></Link></li>
                                <li><Link href="#"><span className="fa fa-brands fa-twitter text-dark"></span></Link></li>
                                <li><Link href="#"><span className="fa fa-brands fa-instagram text-dark"></span></Link></li>
                                <li><Link href="#"><span className="fa fa-brands fa-linkedin text-dark"></span></Link></li>
                            </ul>
                        </div>

                        <div className="col-lg-8">
                            <div className="row links-wrap">
                                <div className="col-6 col-sm-6 col-md-2">
                                    <ul className="list-unstyled ">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/about">About Us</Link></li>
                                        <li><Link to="/shop">Shop</Link></li>
                                        <li><Link to="/contact">Contact us</Link></li>
                                    </ul>
                                </div>



                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><Link to="/privacy">Privacy Policy</Link></li>
                                        <li><Link to="/refund">Refund Policy</Link></li>
                                        <li><Link to="/term">Terms and Conditions</Link></li>
                                    </ul>
                                </div>

                                <div className="col-12 col-sm-6 col-md-4">
                                    <ul className="list-unstyled" style={{ color: 'white' }}>
                                        <li><span className="material-symbols-outlined">
                                            home
                                        </span>R-64, Tilak Nagar, New Delhi</li>
                                        <li><span className="material-symbols-outlined">
                                            call
                                        </span>9809229475</li>
                                        <li><span className="material-symbols-outlined">
                                            mail
                                        </span>simarjeet9891@gmail.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="border-top copyright">
                        <div className="row pt-4">
                            <div className="col-lg-6">
                                <p className="mb-2 text-center text-lg-start text-light">Copyright@Simarjeet9891@gmail.com | All Rights Reserved.
                                </p>
                            </div>

                            <div className="col-lg-6 text-center text-lg-end">
                                <ul className="list-unstyled d-inline-flex ms-auto">
                                    <li className="me-4"><Link href="#">Terms &amp; Conditions</Link></li>
                                    <li><Link href="#">Privacy Policy</Link></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </footer>
        </>
    )
}
