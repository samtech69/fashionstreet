import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { deleteWishlist, getWishlist } from "../Store/ActionCreaters/WishlistAC"
import { getCheckout } from "../Store/ActionCreaters/CheckoutAC"
import { useDispatch, useSelector } from 'react-redux'
export default function Profile() {
    let [user, setUser] = useState({})
    let [wishlist, setWishlist] = useState([])
    let [orders, setOrders] = useState([])
    let dispatch = useDispatch()

    let wishlistStateData = useSelector((state) => state.WishlistStateData)
    let checkoutStateData = useSelector((state) => state.CheckoutStateData)

    function deleteItem(id) {
        dispatch(deleteWishlist({ id: id }))
        getAPIData()
    }

    async function getAPIData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        setUser(response)

        dispatch(getWishlist())
        dispatch(getCheckout())
        if (wishlistStateData.length) {
            setWishlist(wishlistStateData.slice(1).filter((x) => x.userid === localStorage.getItem("userid")))
        }
        if (checkoutStateData.length) {
            setOrders(checkoutStateData.slice(1).filter((x) => x.userid === localStorage.getItem("userid")))
        }
    }
    useEffect(() => {
        getAPIData()
    }, [wishlistStateData.length, checkoutStateData.length])
    return (
        <>
            <div className="container-fluid" style={{ margin: "120px 0px" }}>
                <h5 className='fs-4  text-center py-2 text-warning' style={{ backgroundColor: "rgb(19, 6, 44)" }}>Profile <span className='text-light'>Page</span></h5>
                <div className="row">
                    <div className="col-md-4 m-auto text-center">
                        {
                            user.pic ?
                                <img src={`/img/users/${user.pic}`} height="300px" width="300px" alt="" />
                                :
                                <img src={`/img/product/nouser.png`} height="300px" width="300px" alt="" />

                        }
                    </div>
                    <div className="col-md-8 my-5">
                        <table className='table table-bordered '>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th>username</th>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th>Email id</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th>Phone no.</th>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{user.address}</td>
                                </tr>
                                <tr>
                                    <th>Pincode</th>
                                    <td>{user.pin}</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>{user.city}</td>
                                </tr>
                                <tr>
                                    <th>State</th>
                                    <td>{user.state}</td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><Link to="/update-profile" className='btn btn-warning w-100'>Update Profile</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h5 className='text-center text-light p-2 mb-5' style={{ backgroundColor: "rgb(19, 6, 44)" }}>Wishlist Section</h5>
                {
                    wishlist.length ?
                        <div className="table-responsibve">
                            <table className='table table-bordered table-hover'>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Color/Size</th>
                                        <th>Price</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    {
                                        wishlist.map((item, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    <a href={`/img/product/${item.pic}`} target='_blank' rel="noreferrer">
                                                        <img src={`/img/product/${item.pic}`} height="140px" width="100px" alt="" />
                                                    </a>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}/{item.size}</td>
                                                <td>&#8377;{item.price}</td>
                                                <td><Link to={`/product/${item.productid}`} className='text-dark'><span class="material-symbols-outlined">
                                                    add_shopping_cart
                                                </span></Link></td>
                                                <td><button className='text-dark bg-light border-0' onClick={() => deleteItem(item.id)}><span class="material-symbols-outlined">
                                                    delete
                                                </span></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> :
                        <div className='text-center p-3'>
                            <p>No items in Wishlist</p>
                            <Link to="/shop" className='btn btn-warning'>Shop now</Link>
                        </div>

                }


                <h5 className='text-center text-light p-2 mb-5' style={{ backgroundColor: "rgb(19, 6, 44)" }}>Orders Section</h5>
                {
                    orders.length ?
                        <>
                            {
                                orders.map((item, index) => {
                                    return <div className="row" key={index}>
                                        <div className="col-md-8">
                                            <table className='table table-bordered table-hover'>
                                                <tbody>
                                                    <tr>
                                                        <th></th>
                                                        <th>Name</th>
                                                        <th>Brand</th>
                                                        <th>Color/Size</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                    {
                                                        item.products.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                    <a href={`/img/product/${item.pic}`} target='_blank' rel="noreferrer">
                                                                        <img src={`/img/product/${item.pic}`} height="140px" width="100px" alt="" />
                                                                    </a>
                                                                </td>
                                                                <td>{item.name}</td>
                                                                <td>{item.brand}</td>
                                                                <td>{item.color}/{item.size}</td>
                                                                <td>&#8377;{item.price}</td>
                                                                <td>{item.qty}</td>
                                                                <td>&#8377;{item.total}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="table-responsive">
                                                <table className='table table-bordered'>
                                                    <tbody>
                                                        <tr>
                                                            <th>Order id</th>
                                                            <td>{item.id}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Order Status</th>
                                                            <td>{item.orderstatus}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Payment Mode</th>
                                                            <td>{item.paymentmode}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Payment Status</th>
                                                            <td>{item.paymentstatus}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Subtotal</th>
                                                            <td>&#8377;{item.subtotal}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Shipping</th>
                                                            <td>&#8377;{item.shipping}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total</th>
                                                            <td>&#8377;{item.total}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Date</th>
                                                            <td>{item.date}</td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <hr className='border-3' />
                                    </div>
                                })
                            }
                        </> :
                        <div className='text-center p-3'>
                            <p>No Order History Found</p>
                            <Link to="/shop" className='btn btn-warning'>Shop now</Link>
                        </div>
                }
            </div>
        </>
    )
}
