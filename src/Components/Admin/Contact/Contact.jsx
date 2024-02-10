
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContact, getContact } from '../../../Store/ActionCreaters/ContactAC'

export default function Contact() {
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let ContactStateData = useSelector((state) => state.ContactStateData)


    function deleteItem(id) {
        if (window.confirm("Are you sure! want to delete this item")) {
            dispatch(deleteContact({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getContact())
        if (ContactStateData.length) {
            setData(ContactStateData.slice(1).reverse())
        }
    }

    function getDate(a){
        let date=new Date(a)
        return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
    }
    useEffect(() => {
        getAPIData()
    }
        , [ContactStateData.length])
    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Contact</div>
                        <div className="row">
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Subject</th>
                                            <th>Date</th>
                                            <th>Status</th>
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
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.subject.slice(0, 100) + "...."}</td>
                                                    <td>{getDate(item.date)}</td>
                                                    <td>{item.status}</td>
                                                    <td><Link to={`/admin/contact/show/${item.id}`}><span class="material-symbols-outlined">
                                                        visibility
                                                    </span></Link></td>
                                                    <td>
                                                        {
                                                            item.status !== "Active" ?
                                                                <button className='btn' onClick={() => deleteItem(item.id)}><span className="material-symbols-outlined">
                                                                    delete
                                                                </span></button> :
                                                                ""
                                                        }
                                                    </td>

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


































