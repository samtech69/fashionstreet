import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        cpassword: ""
    })
    let [show,setShow]=useState(false)
    let [message,setMessage]=useState("")
    let navigate=useNavigate()

    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        if(data.password===data.cpassword){
            let response=await fetch("/user",{
                method:"get",
                headers:{
                    "content-type":"application/json"
                }
            })
            response=await response.json()
            let item=response.slice(1).find((x)=>x.username===data.username)
            if(item){
                setShow(true)
                setMessage("username already exists!!!")
            }
            else{
            item={
                name:data.name,
                username:data.username,
                email:data.email,
                phone:data.phone,
                password:data.password,
                role:"Buyer",
                address:"",
                pin:"",
                city:"",
                state:"",
                pic:""
            }
            
            response=await fetch("/user",{
                method:"post",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(item)
            })
            response=await response.json()
            navigate("/login")
            }
        }
        else{
            setShow(true)
            setMessage("Password and Confirm Password Does not matched!!!")
        }
    }
    return (
        <>
            <div className="container-fluid" style={{ margin: "200px 0px" }}>
                <div className="w-75 m-auto" >
                    <h5 className='fs-4  text-center py-2 text-warning' style={{ backgroundColor: "rgb(19, 6, 44)" }}>Login <span className='text-light'>to your Account</span></h5>
                    
        {
            show?<>
                <p className='text-danger py-2 text-center'>{message}</p>
            </>:""
        }

                    <form onSubmit={postData}>

                        <div className="my-3 text-center">
                            <input type="text" name='name' onChange={getInputData} placeholder='Name' className='form-control' />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="my-3 text-center">
                                    <input type="text" name='email' onChange={getInputData} placeholder='Email id' className='form-control' />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="my-3 text-center">
                                    <input type="text" name='phone' onChange={getInputData} placeholder='Phone No.' className='form-control' />
                                </div>
                            </div>
                        </div>

                        <div className="my-3 text-center">
                            <input type="text" name='username' onChange={getInputData} placeholder='Username' className='form-control' />
                        </div>
                        <div className="my-3 text-center">
                            <input type="text" name='password' onChange={getInputData} placeholder=' password' className='form-control' />
                        </div>
                        <div className="my-3 text-center">
                            <input type="text" name='cpassword' onChange={getInputData} placeholder='Confirm Password' className=' form-control' />
                        </div>
                        <div className="mb-3 ">
                            <span className='text-dark'><Link to="/signup" className='text-primary' style={{ textDecoration: "none" }}>Signup </Link >&nbsp;/&nbsp; <Link className='text-primary' style={{ textDecoration: "none" }}>Forget Password</Link></span>
                            <div className="text-center mt-3">

                                <button type="submit" className='btn btn-lg btn-warning w-25 '>Signup</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
