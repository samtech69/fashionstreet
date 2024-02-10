import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let navigate = useNavigate()
    function logout() {
        localStorage.clear()
        navigate("/login")
    }
    return (
        <>
            <nav className="custom-navbar navbar main-background navbar-expand-md " arial-label="Furni navigation bar">

                <div className="container ">
                    {/* <Link className="navbar-brand " to="/"><img src='images/logoo.jpeg' style={{ width: '200px', height: '60px', margin: '-50px -10px' }} /></Link> */}
                    <Link href="#" className="navbar-brand text-warning " style={{ fontFamily: 'Dancing Script', fontSize: '50px' }}>fashion[street]</Link>


                    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="material-symbols-outlined navbar-toggler-icon text-warning w-100">menu</span>
                    </button>

                    <div className="collapse  navbar-collapse " id="navbarsFurni">
                        <ul className="custom-navbar-nav  p-3 navbar-nav ms-auto mb-2 mb-md-0">
                            <li ><Link className="nav-link nav-item asd" to="/">HOME</Link></li>
                            <li><Link className="nav-link asd" to="/about">ABOUT</Link></li>
                            <li><Link className="nav-link asd" to="/shop">SHOP</Link></li>
                            <li><Link className="nav-link asd" to="/contactus">CONTACT</Link></li>
                        </ul>

                        <ul className="custom-navbar-cta  navbar-nav mb-2 mb-md-0 ms-5">
                            {/* <li><Link className="nav-link" to="/cart"><img src="images/cart.svg" /></Link></li>
                            <li><Link className="nav-link" to="#"><img src="images/user.svg" /></Link></li> */}
                            {
                                localStorage.getItem('login') ?
                                    <div className="dropdown">
                                        <a className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {localStorage.getItem("name")}
                                        </a>

                                        <ul className="dropdown-menu drop-down">
                                            {
                                                localStorage.getItem("role") === "Admin" ?
                                                    <li><Link className="dropdown-item" to="/admin">Profile</Link></li>
                                                    :
                                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                            }
                                            <li><Link className="dropdown-item" to="/wishlist">Wishlist</Link></li>
                                            {
                                                localStorage.getItem("role") === "Buyer" ?
                                                    <>
                                                        <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                                                        <li><Link className="dropdown-item" to="/checkout">Checkout</Link></li>

                                                    </> : ""
                                            }
                                            <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                                        </ul>
                                    </div>
                                    :

                                    <Link className="btn btn-secondary" to="/login" role="button" aria-expanded="false">
                                        <span class="material-symbols-outlined">
                                            person
                                        </span>
                                    </Link>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

