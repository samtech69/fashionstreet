
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBrand, getBrand } from '../../../Store/ActionCreaters/BrandAC'

export default function Brand() {
    let [data,setData]=useState([])
    let dispatch = useDispatch()
    let BrandStateData = useSelector((state) => state.BrandStateData)
    
    
    function deleteItem(id) {
        if (window.confirm("Are you sure! want to delete this item")) {
            dispatch(deleteBrand({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getBrand())
        if(BrandStateData.length){
            setData(BrandStateData.slice(1).reverse())
        }
    }
    useEffect(() => {
        getAPIData()
    }
        , [BrandStateData.length])
    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Brand<Link to="/admin/brand/create" className='float-end text-dark'><span class="material-symbols-outlined">
                            add
                        </span></Link></div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
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
                                                    <td><Link to={`/admin/brand/update/${item.id}`}><span class="material-symbols-outlined">
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


































