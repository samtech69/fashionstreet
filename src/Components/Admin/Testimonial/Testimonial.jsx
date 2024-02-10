
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTestimonial, getTestimonial } from '../../../Store/ActionCreaters/TestimonialAC'

export default function Testimonial() {
    let [data,setData]=useState([])
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    
    
    function deleteItem(id) {
        if (window.confirm("Are you sure! want to delete this item")) {
            dispatch(deleteTestimonial({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getTestimonial())
        if(TestimonialStateData.length){
            setData(TestimonialStateData.slice(1).reverse())
        }
    }
    useEffect(() => {
        getAPIData()
    }
        , [TestimonialStateData.length])
    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Testimonial<Link to="/admin/testimonial/create" className='float-end text-dark'><span class="material-symbols-outlined">
                            add
                        </span></Link></div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Profile</th>
                                            <th>Picture</th>
                                            <th>Message</th>
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
                                                    <td>{item.profile}</td>
                                                    <td><img src={`/images/${item.pic}`} alt="" height="100px" width="100px" /></td>
                                                    <td>{item.message.slice(0,200)+"..."}</td>
                                                    <td><Link to={`/admin/testimonial/update/${item.id}`}><span class="material-symbols-outlined">
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


































