import React from 'react'
import { Link } from 'react-router-dom'

export default function Confirmation() {
    return (
        <>
            <div className="container-fluid" style={{ margin: "220px 0px" }}>
                <div className="my-2 text-center fs-5">
                    <h3>Thank You</h3>
                    <h4>Your order has been placed</h4>
                    <h4>Now you can track your order in profile page</h4>
                    <Link to="/shop" className='btn btn-warning w-25'>Shop more</Link>
                </div>
            </div>


        </>
    )
}
