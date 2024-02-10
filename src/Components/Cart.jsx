import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteCart, getCart, updateCart } from "../Store/ActionCreaters/CartAC"

export default function Cart() {
  let [cart, setCart] = useState([])
  let [subtotal, setSubtotal] = useState(0)
  let [shipping, setShipping] = useState(0)
  let [total, setTotal] = useState(0)

  let dispatch = useDispatch()
  let CartStateData = useSelector((state) => state.CartStateData)

  function updateData(id, option) {
    var item = cart.find((x) => x.id === id)
    if (option == "dec" && item.qty === 1)
      return
    else if (option == "dec") {
      item.qty = item.qty - 1
      item.total = item.total - item.price
    }
    else {
      item.qty = item.qty + 1
      item.total = item.total + item.price
    }
    dispatch(updateCart(item))
    getAPIData()
  }
  function deleteData(id) {
    dispatch(deleteCart({ id: id }))
    getAPIData()
  }

  function getAPIData() {
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
  }, [CartStateData.length])

  return (
    <>
      <div className="container-fluid" style={{ margin: "130px 0px" }}>
        <div className='mb-5 container-fluid'>
          <div className='breadcrum  py-2 '>
            <Link to="/">Home</Link><span>&nbsp;>&nbsp;</span><Link to="/cart">Cart</Link>
          </div>
        </div>
        {
          cart.length ?
            <>
              <div className="table table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Color/Size</th>
                      <th>Price</th>
                      <th></th>
                      <th>Quantity</th>
                      <th></th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cart.map((item, index) => {
                        return <tr key={index}>
                          <td><a href={`img/product/${item.pic}`} target='_blank' rel="noreferrer"><img src={`img/product/${item.pic}`} alt="" height="140px" width="100px" /></a></td>
                          <td>{item.name}</td>
                          <td>{item.brand}</td>
                          <td>{item.color}/{item.size}</td>
                          <td>&#8377;{item.price}</td>
                          <td><button className='btn btn-sm mx-3' onClick={(() => updateData(item.id, "dec"))}><span className="material-symbols-outlined">
                            remove
                          </span></button></td>
                          <td>{item.qty}</td>
                          <td><button className='btn btn-sm mx-3' onClick={(() => updateData(item.id, "inc"))}><span className="material-symbols-outlined">
                            add
                          </span></button></td>
                          <td>&#8377;{item.total}</td>
                          <td><button className='btn btn-sm mx-3' onClick={(() => deleteData(item.id))}><span className="material-symbols-outlined text-danger">
                            delete
                          </span></button></td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
                <div className="text-center">
                  <Link to="/shop" className='btn btn-dark w-100'>Shop more items</Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <table className='table table-bordered mt-5'>
                    <tbody >
                      <tr>
                        <th>Subtotal</th>
                        <td>&#8377;{subtotal}</td>
                      </tr>
                      <tr>
                        <th>Shipping Charges</th>
                        <td>&#8377;{shipping}</td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>&#8377;{total}</td>
                      </tr>
                      <tr>
                        <th colSpan={2}><Link to={"/checkout"} className='btn btn-warning w-100'>Checkout</Link></th>

                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </> :
            <div className="my-2 text-center fs-5">
              <p>No items in Cart</p>
              <Link to="/shop" className='btn btn-warning w-25'>Shop now</Link>
            </div>
        }
      </div>
    </>
  )
}
