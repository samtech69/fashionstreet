import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    let [data, setData] = useState({
        username: "",
        password: ""
    })

    let [show,setShow]=useState(false)
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
        let response=await fetch("/user",{
            method:"get",
            headers:{
                "content-type":"application/json"
            }
        })
        response=await response.json()
        let item=response.slice(1).find((x)=>x.username===data.username && x.password===data.password)
        if(item){
            localStorage.setItem("login",true)
            localStorage.setItem("userid",item.id)
            localStorage.setItem("name",item.name)
            localStorage.setItem("username",item.username)
            localStorage.setItem("role",item.role)
            if(item.role==="Buyer")
            navigate("/profile")
            else
            navigate("/admin")
        }
        else
        setShow(true)
    }
    return (
        <>
            <div className="container-fluid" style={{ margin: "200px 0px" }}>
                <div className="w-75 m-auto" >
                    <h5 className='fs-4  text-center py-2 text-warning' style={{ backgroundColor: "rgb(19, 6, 44)" }}>Login <span className='text-light'>to your Account</span></h5>
                    {
                        show ? <>
                            <p className='text-danger py-2 text-center'>Invalid username or password</p>
                        </> : ""
                    }
                    <form onSubmit={postData}>
                        <div className="my-3 text-center">
                            <input type="text" name='username' onChange={getInputData} placeholder='User Name' className='form-control' />
                        </div>
                        <div className="my-3 text-center">
                            <input type="text" name='password' onChange={getInputData} placeholder='Password' className=' form-control' />
                        </div>
                        <div className="mb-3 ">
                            <span className='text-dark'><Link to="/signup" className='text-primary' style={{ textDecoration: "none" }}>Signup </Link >&nbsp;/&nbsp; <Link className='text-primary' style={{ textDecoration: "none" }}>Forget Password</Link></span>
                            <div className="text-center mt-3">

                                <button type="submit" className='btn btn-lg btn-warning w-25 '>Login</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
