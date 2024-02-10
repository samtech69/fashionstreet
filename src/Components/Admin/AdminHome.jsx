import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

export default function AdminHome() {
    let [user, setUser] = useState({})
    async function getAPIData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        setUser(response)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-1">Admin</div>
                        <div className="row">
                            <div className="col-md-5 py-3 ">
                                {
                                    user.pic ?
                                        <img src={`/img/users/${user.pic}`} height="300px" width="300px" alt="" />
                                        :
                                        <img src={`/img/product/nouser.png`} height="300px" width="300px" alt="" />

                                }
                                {/* <img src="images/person_1.jpg" alt="" height="220px" width="250px" /> */}
                            </div>
                            <div className="col-md-7">
                                <table className='table table-bordered my-2'>
                                    <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Username</th>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <th>Email Id</th>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone</th>
                                            <td>{user.phone}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} ><Link to='/update-profile' className='btn btn-warning w-100'>Update profile</Link></td>
                                        </tr>

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
