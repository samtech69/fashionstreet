
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'

import { updateTestimonial, getTestimonial } from "../../../Store/ActionCreaters/TestimonialAC"
import { useDispatch, useSelector } from 'react-redux'

export default function UpdateTestimonial() {
    let [data, setData] = useState({
        name: "",
        profile: "",
        pic: "",
        message: ""
    })
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { id } = useParams()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)

    function getInputData(e) {
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }



    async function postData(e) {
        e.preventDefault()
        dispatch(updateTestimonial({ ...data }))
        navigate("/admin/testimonial")
    }



    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length) {
            let item = TestimonialStateData.slice(1).find((x) => x.id === Number(id))
            if (item)
                setData(item)

        }
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length]
    )

    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Testimonial</div>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" value={data.name} name='name' required minLength={3} maxLength={15} onChange={getInputData} className='form-control' placeholder='Name' />
                            </div>

                            <div className="row">
                                <div className="col-md-6 my-3">
                                    <label>Profile</label>
                                    <input type="text" value={data.profile} name='profile' required onChange={getInputData} className='form-control' placeholder='Profile' />
                                </div>
                                <div className="col-md-6 my-3">
                                    <label>Picture</label>
                                    <input type="file" name='pic' onChange={getInputFile} className='form-control' />
                                </div>
                            </div>

                            <div className="my-3">
                                <label>Message</label>
                                <textarea className='form-control' value={data.message} name="message" rows="5" onChange={getInputData} placeholder='write a message......'></textarea>
                            </div>

                            <div className="mb-3">
                                <button type="button" className='btn btn-dark w-50' onClick={() => window.history.back()}>back</button>
                                <button type="submit" className='btn btn-warning w-50 '>create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

