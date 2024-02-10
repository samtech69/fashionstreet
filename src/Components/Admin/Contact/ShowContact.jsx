
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContact, getContact, updateContact } from '../../../Store/ActionCreaters/ContactAC'

export default function ShowContact() {
    let { id } = useParams()
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let ContactStateData = useSelector((state) => state.ContactStateData)
    let navigate = useNavigate()

    function updateItem() {
        dispatch(updateContact({ ...data, status: "Done" }))
        setData((old) => {
            return {
                ...old,
                "status": "Done"
            }
        })
    }

    function deleteItem() {
        if (window.confirm("Are you sure! want to delete this item")) {
            dispatch(deleteContact({ id: id }))
            getAPIData()
        }
        navigate("/admin/contact")
    }
    function getAPIData() {
        dispatch(getContact())
        if (ContactStateData.length) {
            setData(ContactStateData.slice(1).find((x) => x.id === Number(id)))
        }
    }

    function getDate(a) {
        let date = new Date(a)
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
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
                        <div className="bg-warning text-center p-2 my-2">Contact Us Query</div>
                        <div className="row">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{getDate(data.date)}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{data.status}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.status === "Active" ?
                                                    <button className='btn btn-success w-100' onClick={updateItem}>Update Status</button>
                                                    :
                                                    <button className='btn btn-danger  w-100' onClick={deleteItem}>Delete Status</button>

                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


































