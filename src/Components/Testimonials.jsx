


import React, { useState, useEffect } from 'react'
import { getTestimonial } from "../Store/ActionCreaters/TestimonialAC"
import { useDispatch, useSelector } from 'react-redux'
// import ReactOwlCarousel from 'react-owl-carousel'
// export default function Testimonials() {
//     let [data, setData] = useState([])
//     let dispatch = useDispatch()
//     let TestimonialStateData = useSelector((state) => state.TestimonialStateData)

//     function getAPIData() {
//         dispatch(getTestimonial())
//         if (TestimonialStateData.length)
//             setData(TestimonialStateData.slice(1).reverse())
//     }
//     useEffect(() => {
//         getAPIData()
//     }, [TestimonialStateData.length]
//     )
//     return (
//         <>




//           <div className="center" style={{height:"200px",width:"200px"}}>
//           <ReactOwlCarousel>
//           {
//                     data.map((item, index) => {
//                         return <div key={index} className="carousel-inner">
//                             <div className="carousel-item active">
//                                 <img src={`/images/${item.pic}`} className="d-block w-100" alt="..." height="200px" width="200px" />
//                             </div>
//                         </div>
//                     })
//                 }
//           </ReactOwlCarousel>
//           </div>


//             {/* <div className="testimonial-section">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-7 mx-auto text-center">
//                             <h2 className="section-title">Testimonials</h2>
//                         </div>
//                     </div>

//                     <div className="row justify-content-center">
//                         <div className="col-lg-12">
//                             <div className="testimonial-slider-wrap text-center">

//                                 <div id="testimonial-nav">
//                                     <span className="prev" data-controls="prev"><span className="fa fa-chevron-left"></span></span>
//                                     <span className="next" data-controls="next"><span className="fa fa-chevron-right"></span></span>
//                                 </div>

//                                 <div className="testimonial-slider">

//                                     <div className="item">
//                                         <div className="row justify-content-center">
//                                             <div className="col-lg-8 mx-auto">

//                                                 <div className="testimonial-block text-center">
//                                                     <blockquote className="mb-5">
//                                                         <p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
//                                                     </blockquote>

//                                                     <div className="author-info">
//                                                         <div className="author-pic">
//                                                             <img src="images/person-1.png" alt="Maria Jones" className="img-fluid"/>
//                                                         </div>
//                                                         <h3 className="font-weight-bold">Maria Jones</h3>
//                                                         <span className="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="item">
//                                         <div className="row justify-content-center">
//                                             <div className="col-lg-8 mx-auto">

//                                                 <div className="testimonial-block text-center">
//                                                     <blockquote className="mb-5">
//                                                         <p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
//                                                     </blockquote>

//                                                     <div className="author-info">
//                                                         <div className="author-pic">
//                                                             <img src="images/person-1.png" alt="Maria Jones" className="img-fluid"/>
//                                                         </div>
//                                                         <h3 className="font-weight-bold">Maria Jones</h3>
//                                                         <span className="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="item">
//                                         <div className="row justify-content-center">
//                                             <div className="col-lg-8 mx-auto">

//                                                 <div className="testimonial-block text-center">
//                                                     <blockquote className="mb-5">
//                                                         <p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
//                                                     </blockquote>

//                                                     <div className="author-info">
//                                                         <div className="author-pic">
//                                                             <img src="images/person-1.png" alt="Maria Jones" className="img-fluid"/>
//                                                         </div>
//                                                         <h3 className="font-weight-bold">Maria Jones</h3>
//                                                         <span className="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div> */}
//         </>
//     )
// }

// import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// ....
export default function Testimonials() {
    let [data, setData] = useState([])
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)

    function getAPIData() {
        dispatch(getTestimonial())
        if (TestimonialStateData.length)
            setData(TestimonialStateData.slice(1).reverse())
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length]
    )
    return (
        <>

            <div className="col-xxl-12  wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="text-center">
                        <h6 className="text-danger text-uppercase">// Testimonial //</h6>
                        <h1 className="mb-5">Our Clients Say!</h1>
                    </div>
                    <div className="position-relative pb-5" style={{zIndex:"0"}}>
                        <OwlCarousel className='owl-theme' loop margin={10} nav>
                            {
                                data.map((item, index) => {
                                    return <div key={index} className="testimonial-item text-center">
                                        <img className="bg-light rounded-circle p-2 mx-auto mb-3" src={`/images/${item.pic}`} style={{ width: "80px", height: "80px" }} />
                                        <h5 className="mb-0">{item.name}</h5>
                                        <p>{item.profile}</p>
                                        <div className="bg-light text-center p-4">
                                            <p style={{textAlign:"justify"}} className="mb-0 testimonial-message">{item.message}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </>
    )
}