import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        pin: "",
        city: "",
        state: "",
        pic: "",
        username:""
    })
    let navigate = useNavigate()

    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        var { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        var response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "put",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ ...data })
        })
        response = await response.json()
        if (data.role === "Admin")
            navigate("/admin")
        else
            navigate("/profile")

    }
    async function getAPIData() {
        let response = await fetch("/user/" + localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        setData(response)
    }
    useEffect(() => {
        getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid" style={{ margin: "200px 0px" }}>
                <div className="w-75 m-auto" >
                    <h5 className='fs-4  text-center py-2 text-warning' style={{ backgroundColor: "rgb(19, 6, 44)" }}>Update <span className='text-light'>Profile</span></h5>

                    <form onSubmit={postData}>

                        <div className="my-3 text-center">
                            <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Name' className='form-control' />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="my-3 text-center">
                                    <input type="text" name='email' value={data.email} onChange={getInputData} placeholder='Email id' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="my-3 text-center">
                                    <input type="text" name='phone' value={data.phone} onChange={getInputData} placeholder='Phone No.' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className="my-3 text-center">
                            <input type="file" name='pic' onChange={getInputFile} className='form-control' />
                        </div>
                        <div className="my-3 text-center">
                            <textarea name='address' rows="3" value={data.address} onChange={getInputData} placeholder=' Enter Address' className='form-control' />
                        </div>
                        <div className="my-3 text-center">
                            <input type="number" name='pin' value={data.pin} onChange={getInputData} placeholder='Enter Pincode' className=' form-control' />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="my-3 text-center">
                                    <input type="text" name='city' value={data.city} onChange={getInputData} placeholder='City' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="my-3 text-center">
                                    <input type="text" name='state' value={data.state} onChange={getInputData} placeholder='State' className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-3 btn-group w-100">

                            <button type="submit" className='btn btn-lg btn-dark' onClick={()=>window.history.back()}>Back</button>
                            <button type="submit" className='btn btn-lg btn-warning'>Update</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
