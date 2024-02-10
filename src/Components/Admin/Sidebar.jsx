import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <>
            <div className="list-group listy">
                <Link to="/admin" className="list-group-item list-group-item-action" id='Homme'>
                    <span className="material-symbols-outlined float-end">
                        home
                    </span>Home
                </Link>
                <Link to="/admin/users" className="list-group-item list-group-item-action"><span className="material-symbols-outlined  float-end">
                    group
                </span>Users</Link>
                <Link to="/admin/maincategory" className="list-group-item list-group-item-action"><span className="material-symbols-outlined  float-end">
                    category
                </span>Maincategory</Link>
                <Link to="/admin/subcategory" className="list-group-item list-group-item-action"><span className="material-symbols-outlined float-end">
                    category
                </span>Subcategory</Link>
                <Link to="/admin/brand" className="list-group-item list-group-item-action"><span className="material-symbols-outlined float-end">
                    sell
                </span>Brand</Link>
                <Link to="/admin/product" className="list-group-item list-group-item-action"><span className="material-symbols-outlined float-end">
                    shopping_bag
                </span>Product</Link>
                <Link to="/admin/newsletter" className="list-group-item list-group-item-action"><span className="material-symbols-outlined float-end">
                    mail
                </span>Newsletter</Link>
                <Link to="/admin/contact" className="list-group-item list-group-item-action"><span className="material-symbols-outlined float-end">
                    call
                </span>Contact</Link>
                <Link to="/admin/checkout" className="list-group-item list-group-item-action"><span className="material-symbols-outlined float-end">
                    shopping_cart
                </span>Checkout</Link>

                <Link to="/admin/testimonial" className="list-group-item list-group-item-action"><span className="material-symbols-outlined float-end">
                    star
                </span>Testimonials</Link>


            </div>
        </>
    )
}
