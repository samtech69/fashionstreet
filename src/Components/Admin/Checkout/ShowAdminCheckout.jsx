
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckout, updateCheckout } from '../../../Store/ActionCreaters/CheckoutAC'

export default function ShowAdminCheckout() {
    let { id } = useParams()
    let [data, setData] = useState([])
    let [user, setUser] = useState({})
    let [orderstatus, setOrderstatus] = useState("")
    let [paymentstatus, setPaymentstatus] = useState("")
    let dispatch = useDispatch()
    let CheckoutStateData = useSelector((state) => state.CheckoutStateData)
    function getInputData(e) {
        var { name, value } = e.target
        if (name === "orderstatus")
            setOrderstatus(value)
        else
            setPaymentstatus(value)
    }

    function updateItem() {
        dispatch(updateCheckout({ ...data, orderstatus: orderstatus, paymentstatus: paymentstatus }))
        setData((old) => {
            return {
                ...old,
                "orderstatus": orderstatus,
                "paymentstatus": paymentstatus
            }
        })
    }

    async function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.slice(1).find((x) => x.id === Number(id))
            setData(item)
            let response = await fetch("/user/" + item.userid, {
                method: "get",
                headers: {
                    "content-type": "appication/json"
                }
            })
            response = await response.json()
            setUser(response)
            setOrderstatus(item.orderstatus)
            setPaymentstatus(item.paymentstatus)
        }

    }

    function getDate(a) {
        let date = new Date(a)
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
    }
    useEffect(() => {
        getAPIData()
    }
        , [CheckoutStateData.length])
    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Checkout Us Query</div>
                        <div className="row">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>User</th>
                                        <td>
                                            {user.name}<br />
                                            {user.email}<br />
                                            {user.phone}<br />
                                            {user.address}<br />
                                            {user.pin},{user.city},{user.state}<br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>
                                            {data.orderstatus}<br />
                                            {
                                                data.orderstatus !== "Delivered" ?
                                                    <select name="orderstatus" onChange={getInputData} value={orderstatus} className='form-select my-2'>
                                                        <option value="Order is Placed">Order is Placed</option>
                                                        <option value="Packed">Packed</option>
                                                        <option value="Ready to Ship">Ready to Ship</option>
                                                        <option value="Shipped">Shipped</option>
                                                        <option value="Order in Transit">Order in Transit</option>
                                                        <option value="Order Reaced to the Final Destination">Order Reaced to the Final Destination</option>
                                                        <option value="Out For Delivery">Out For Delivery</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>payment Mode</th>
                                        <td>{data.paymentmode}</td>
                                    </tr>
                                    <tr>
                                        <th>PaymentStatus</th>
                                        <td>
                                            {data.paymentstatus}<br />
                                            {
                                                data.paymentstatus !== "Done" ?
                                                    <select name="paymentstatus" onChange={getInputData} value={paymentstatus} className='form-select my-2'>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Done">Done</option>
                                                    </select> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>{data.shipping}</td>
                                    </tr>


                                    <tr>
                                        <th>Date</th>
                                        <td>{getDate(data.date)}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RP payment id</th>
                                        <td>{data.rppid}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>{data.total}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.orderstatus !== "Delivered" && data.paymentstatus !== "Done" ?
                                                    <button className='btn btn-success w-100' onClick={updateItem}>update</button>
                                                    :
                                                    ""
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="table-responsive">
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
                                            data.products && data.products.map((item, index) => {
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


































