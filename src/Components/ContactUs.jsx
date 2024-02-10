import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addContact } from '../Store/ActionCreaters/ContactAC'

export default function ContactUs() {
    let [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: ""
    })
    let [show, setShow] = useState(false)
    let dispatch = useDispatch()

    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        dispatch(addContact({ ...data, date: new Date,status:"Active" }))
        setShow(true)
        setData({
            name: "",
            phone: "",
            email: "",
            subject: "",
            message: ""
        })
    }
    return (
        <>

            <div className="untree_co-section">
                <div className="container-fluid" style={{ margin: "30px 0px" }}>
                    <div className='mb-5'>
                        <div className='breadcrum py-2'>
                            <Link to="/">Home</Link><span>&nbsp;>&nbsp;</span><Link to="/contactus">Contact</Link>
                        </div>
                    </div>



                    <div className="block">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row mb-5">
                                    <div className="col-md-4">
                                        <div className="service no-shadow align-items-center link horizontal d-flex active" data-aos="fade-left" data-aos-delay="0">
                                            <div className="service-icon bg-dark mb-4">
                                                <span className="material-symbols-outlined">
                                                    location_on
                                                </span>
                                            </div>
                                            <div className="service-contents">
                                                <p>R-66 Tilak Nagar, New Delhi-110041 </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="service no-shadow align-items-center link horizontal d-flex active" data-aos="fade-left" data-aos-delay="0">
                                            <div className="service-icon bg-dark mb-4">
                                                <span className="material-symbols-outlined">
                                                    mail
                                                </span>
                                            </div>
                                            <div className="service-contents senders">
                                                <p><a href="mailto:simarjeet9891@gmail.com">simarjeet9891@gmail.com</a></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="service no-shadow align-items-center link horizontal d-flex active" data-aos="fade-left" data-aos-delay="0">
                                            <div className="service-icon bg-dark mb-4">
                                                <span className="material-symbols-outlined">
                                                    call
                                                </span>
                                            </div>
                                            <div className="service-contents senders">
                                                <p><a href="tel:+919891466004">+91-9891466004</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    show ?
                                        <p className='text-center'>Thanks to Contact us our team will Contact you soon</p>
                                        : ""
                                }
                                <form onSubmit={postData}>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height="460" id="gmap_canvas" src="https://maps.google.com/maps?q=tilak%20nagar&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className='text-center bg-dark text-light mb-3 py-1'>
                                                <h2>Contact Form</h2>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="text-black" htmlFor="name">First name</label>
                                                        <input type="text" className="form-control" name='name' onChange={getInputData} value={data.name} id="name" placeholder='Your Name' />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label className="text-black" htmlFor="phone">Phone</label>
                                                        <input type="text" className="form-control" name='phone' onChange={getInputData} value={data.phone} id="phone" placeholder='Phone' />

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="text-black" htmlFor="email">Email address</label>
                                                <input type="email" className="form-control" name='email' onChange={getInputData} value={data.email} id="email" placeholder='Your Email' />
                                            </div>
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="subject">Subject</label>
                                                <input type="text" className="form-control" name='subject' onChange={getInputData} value={data.subject} id="subject" placeholder='Subject' />
                                            </div>
                                            <div className="form-group mb-5">
                                                <label className="text-black" htmlFor="message">Message</label>
                                                <textarea className="form-control" name='message' onChange={getInputData} value={data.message} id="message" rows={5} placeholder='message......'></textarea>
                                            </div>

                                            <button type="submit" className="btn btn-dark w-100">Send Message</button>
                                        </div>
                                    </div>
                                </form>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
