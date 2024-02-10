import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Home from './Home'
import AdminHome from './Admin/AdminHome'
import Maincategory from './Admin/MainCategory/Maincategory'
import Createmaincategory from './Admin/MainCategory/Createmaincategory'
import Updatemaincategory from './Admin/MainCategory/updatemaincategory'

import Subcategory from './Admin/SubCategory/Subcategory'
import Createsubcategory from './Admin/SubCategory/Createsubcategory'
import Updatesubcategory from './Admin/SubCategory/Updatesubcategory'

import Brand from './Admin/Brand/Brand'
import Createbrand from './Admin/Brand/Createbrand'
import Updatebrand from './Admin/Brand/Updatebrand'

import Product from './Admin/Product/Product'
import Createproduct from './Admin/Product/Createproduct'
import Updateproduct from './Admin/Product/Updateproduct'

import User from './Admin/User/User'

import Testimonial from './Admin/Testimonial/Testimonial'
import Createtestimonial from './Admin/Testimonial/Createtestimonial'
import Updatetestimonial from './Admin/Testimonial/Updatetestimonial'
import Shop from './Shop'
import SingleProduct from './SingleProduct'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import UpdateProfile from './UpdateProfile'
import Cart from './Cart'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import Error from './Error'
import Newsletter from './Admin/Newsletter/Newsletter'
import Contact from './Admin/Contact/Contact'
import ContactUs from './ContactUs'
import ShowContact from './Admin/Contact/ShowContact'
import AdminCheckout from './Admin/Checkout/AdminCheckout'
import ShowAdminCheckout from './Admin/Checkout/ShowAdminCheckout'

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/product/:id' element={<SingleProduct />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />

                    <Route path='/profile' element={localStorage.getItem("login")?<Profile />:<Login/>} />
                    <Route path='/update-profile' element={localStorage.getItem("login")?<UpdateProfile />:<Login/>} />
                    <Route path='/cart' element={localStorage.getItem("login")?<Cart />:<Login/>} />
                    <Route path='/checkout' element={localStorage.getItem("login")?<Checkout />:<Login/>} />
                    <Route path='/confirmation' element={localStorage.getItem("login")?<Confirmation />:<Login/>} />

                    <Route path='/admin' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminHome /> : <Profile /> : <Login />} />

                    <Route path='/admin/maincategory' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Maincategory /> : <Profile /> : <Login />} />
                    <Route path='/admin/maincategory/create' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Createmaincategory /> : <Profile /> : <Login />} />
                    <Route path='/admin/maincategory/update/:id' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Updatemaincategory /> : <Profile /> : <Login />} />

                    <Route path='/admin/subcategory' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Subcategory /> : <Profile /> : <Login />} />
                    <Route path='/admin/subcategory/create' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Createsubcategory /> : <Profile /> : <Login />} />
                    <Route path='/admin/subcategory/update/:id' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Updatesubcategory /> : <Profile /> : <Login />} />

                    <Route path='/admin/brand' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Brand /> : <Profile /> : <Login />} />
                    <Route path='/admin/brand/create' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Createbrand /> : <Profile /> : <Login />} />
                    <Route path='/admin/brand/update/:id' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Updatebrand /> : <Profile /> : <Login />} />

                    <Route path='/admin/product' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Product /> : <Profile /> : <Login />} />
                    <Route path='/admin/product/create' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Createproduct /> : <Profile /> : <Login />} />
                    <Route path='/admin/product/update/:id' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Updateproduct /> : <Profile /> : <Login />} />

                    <Route path='/admin/users' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <User /> : <Profile /> : <Login />} />

                    <Route path='/admin/testimonial' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Testimonial /> : <Profile /> : <Login />} />
                    <Route path='/admin/testimonial/create' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Createtestimonial /> : <Profile /> : <Login />} />
                    <Route path='/admin/testimonial/update/:id' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Updatetestimonial /> : <Profile /> : <Login />} />

                    <Route path='/admin/newsletter' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Newsletter /> : <Profile /> : <Login />} />
                    <Route path='/admin/contact' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <Contact /> : <Profile /> : <Login />} />
                    <Route path='/admin/contact/show/:id' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <ShowContact /> : <Profile /> : <Login />} />

                    <Route path='/admin/checkout' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminCheckout /> : <Profile /> : <Login />} />
                    <Route path='/admin/checkout/show/:id' element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <ShowAdminCheckout /> : <Profile /> : <Login />} />


                    {/* <Route path='/' element={<About />} /> */}
                    <Route path='/contactus' element={<ContactUs />} />
                    <Route path='/*' element={<Error />} />
                </Routes>

                <Footer />
            </BrowserRouter>
        </>
    )
}
