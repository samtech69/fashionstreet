import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, deleteCart } from "../Store/ActionCreaters/CartAC"
import { addCheckout } from "../Store/ActionCreaters/CheckoutAC"
import { Link, useNavigate } from 'react-router-dom'

export default function Checkout() {
  let [user, setUser] = useState({})
  let [cart, setCart] = useState([])
  let [subtotal, setSubtotal] = useState(0)
  let [shipping, setShipping] = useState(0)
  let [total, setTotal] = useState(0)
  let [mode, Setmode] = useState("COD")

  let navigate = useNavigate()

  let dispatch = useDispatch()
  let CartStateData = useSelector((state) => state.CartStateData)
  function placeOrder() {
    var item = {
      userid: localStorage.getItem("userid"),
      paymentmode: mode,
      paymentstatus: "Pending",
      orderstatus: "Order is Placed",
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      date: new Date(),
      products: cart
    }
    dispatch(addCheckout(item))
    for (let item of cart) {
      dispatch(deleteCart({ id: item.id }))
    }
    navigate("/confirmation")
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
    dispatch(getCart())
    if (CartStateData.length) {
      let item = CartStateData.slice(1).filter((x) => x.userid === localStorage.getItem("userid"))
      setCart(item)
      let total = 0
      for (let c of item) {
        total = total + c.total
      }
      if (total > 0 && total < 1000) {
        setShipping(150)
        setTotal(total + 150)
      }
      else {
        setTotal(total)
        setShipping(0)
      }
      setSubtotal(total)

    }
  }
  useEffect(() => {
    getAPIData()
  }, [])
  return (
    <>
      <div className="container-fluid" style={{ margin: "220px 0px" }}>
        {
          cart.length ?
            <>
              <div className="row">
                <div className="col-md-6">
                  <h5 className='fs-3 text-center bg-dark text-light p-2'>Shipping Details</h5>
                  <table className='table table-bordered'>
                    <tbody >
                      <tr >
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
                        <td colSpan={2}><Link to="/update-profile" className='btn btn-warning w-100'>Update Details</Link></td>
                      </tr>
                    </tbody>
                  </table>
                </div>


                <div className="col-md-6">
                  <h5 className='fs-3 text-center bg-dark text-light p-2'>Products in Cart</h5>
                  <table className='table table-bordered'>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cart.map((item, index) => {
                          return <tr key={index}>
                            <td>{item.name}</td>
                            <td>&#8377;{item.price}</td>
                            <td>{item.qty}</td>
                            <td>&#8377;{item.total}</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                  <table className='table table-bordered'>
                    <tbody>
                      <tr>
                        <th>Subtotal</th>
                        <td>&#8377;{subtotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping</th>
                        <td>&#8377;{shipping}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>&#8377;{total}</td>
                      </tr>
                      <tr >
                        <th>Payment Mode</th>
                        <td>
                          <select name="mode" id="form-select">
                            <option value="COD">COD</option>
                            <option value="NetBanking">NetBanking/CARD/UPI</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <th colSpan={2}><button className='btn btn-warning w-100' onClick={placeOrder}>Place order</button></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
            :
            <div className="my-2 text-center fs-5">
              <p>No items in Cart</p>
              <Link to="/shop" className='btn btn-warning w-25'>Shop now</Link>
            </div>
        }

      </div>
    </>
  )
}
