
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProduct } from '../../../Store/ActionCreaters/ProductAC'

export default function Product() {
    let [data,setData]=useState([])
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    
    
    function deleteItem(id) {
        if (window.confirm("Are you sure! want to delete this item")) {
            dispatch(deleteProduct({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getProduct())
        if(ProductStateData.length){
            setData(ProductStateData.slice(1).reverse())
        }
    }
    useEffect(() => {
        getAPIData()
    }
        , [ProductStateData.length])
    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Product<Link to="/admin/product/create" className='float-end text-dark'><span class="material-symbols-outlined">
                            add
                        </span></Link></div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Color/Size</th>
                                            <th>Price</th>
                                            <th>Stock</th>
                                            <th>Pic1</th>
                                            <th>Pic2</th>
                                            <th>Pic3</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.maincategory}/{item.subcategory}/{item.brand}</td>
                                                    <td>{item.color}/{item.size}</td>
                                                    <td><del className='text-danger'>&#8377;{item.baseprice}  </del>&#8377;{item.finalprice}  <sup className='text-success'> {item.discount}%off</sup></td>
                                                    <td>{item.stock}</td>
                                                    <td><a href={`/img/product/${item.pic1}`} target="_blank" rel='noreferrer' ><img src={`/img/product/${item.pic1}`} height='130px' width='100px' /></a></td>
                                                    <td><a href={`/img/product/${item.pic2}`} target="_blank" rel='noreferrer' ><img src={`/img/product/${item.pic2}`} height='130px' width='100px' /></a></td>
                                                    <td><a href={`/img/product/${item.pic3}`} target="_blank" rel='noreferrer' ><img src={`/img/product/${item.pic3}`} height='130px' width='100px' /></a></td>


                                                    <td><Link to={`/admin/product/update/${item.id}`}><span class="material-symbols-outlined">
                                                        edit
                                                    </span></Link></td>
                                                    <td><button className='btn' onClick={() => deleteItem(item.id)}><span className="material-symbols-outlined">
                                                        delete
                                                    </span></button></td>

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


































