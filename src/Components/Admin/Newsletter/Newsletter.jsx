
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNewsletter, getNewsletter } from '../../../Store/ActionCreaters/NewsletterAC'

export default function Newsletter() {
    let [data,setData]=useState([])
    let dispatch = useDispatch()
    let NewsletterStateData = useSelector((state) => state.NewsletterStateData)
    
    
    function deleteItem(id) {
        if (window.confirm("Are you sure! want to delete this item")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getNewsletter())
        if(NewsletterStateData.length){
            setData(NewsletterStateData.slice(1).reverse())
        }
    }
    useEffect(() => {
        getAPIData()
    }
        , [NewsletterStateData.length])
    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Newsletter</div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
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


































