import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct } from '../Store/ActionCreaters/ProductAC'
import { addCart, getCart } from '../Store/ActionCreaters/CartAC'
import { addWishlist, getWishlist } from '../Store/ActionCreaters/WishlistAC'


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function SingleProduct() {
    let [data, setData] = useState({
        pic1: "",
        pic2: "",
        pic3: ""
    })
    let [relatedProducts, setrelatedProducts] = useState([])
    let { id } = useParams()
    let [qty, setQty] = useState(1)
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let CartStateData = useSelector((state) => state.CartStateData)
    let WishlistStateData = useSelector((state) => state.WishlistStateData)
    let navigate = useNavigate()

    function addToCart() {
        var item = CartStateData.slice(1).find((x) => x.userid === localStorage.getItem("userid") && x.productid === id)
        if (item)
            navigate("/cart")
        else {
            item = {
                userid: localStorage.getItem("userid"),
                productid: id,
                name: data.name,
                brand: data.brand,
                color: data.color,
                size: data.size,
                price: data.finalprice,
                qty: qty,
                total: data.finalprice * qty,
                pic: data.pic1,
            }
            dispatch(addCart(item))
            navigate("/cart")
        }
    }
    function addToWishlist() {
        var item = WishlistStateData.slice(1).find((x) => x.userid === localStorage.getItem("userid") && x.productid === id)
        if (item)
            navigate("/profile")
        else {
            item = {
                userid: localStorage.getItem("userid"),
                productid: id,
                name: data.name,
                brand: data.brand,
                color: data.color,
                size: data.size,
                price: data.finalprice,
                pic: data.pic1,
            }
            dispatch(addWishlist(item))
            navigate("/profile")
        }
    }

    function getAPIData() {
        dispatch(getProduct())
        dispatch(getCart())
        dispatch(getWishlist())
        if (ProductStateData.length) {
            let item = ProductStateData.slice(1).find((x) => x.id === Number(id))
            if (item) {
                setData(item)
                setrelatedProducts(ProductStateData.slice(1).reverse().filter((x) => x.maincategory == item.maincategory && x.subcategory === item.subcategory))
            }

            else {
                navigate('/shop')
            }
        }
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length, id, CartStateData.length, WishlistStateData.length])
    return (
        <>
            <div className="" style={{ margin: "90px 0px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-5">
                            <div className="row">
                                <div className="col-md-8">
                                    <div id="carouselExampleIndicators" class="carousel slide">
                                        {/* <div class="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div> */}
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src={`/img/product/${data.pic1}`} height="500px" class="d-block w-100" alt="..." />
                                            </div>
                                            <div class="carousel-item">
                                                <img src={`/img/product/${data.pic2}`} height="500px" class="d-block w-100" alt="..." />
                                            </div>
                                            <div class="carousel-item">
                                                <img src={`/img/product/${data.pic3}`} height="500px" class="d-block w-100" alt="..." />
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>

                                </div>
                                <div className="col-md-4" style={{ margin: "85px 0px" }}>
                                    <div>
                                        <img className='' style={{ paddingLeft: "8px", marginTop: "8px" }} src={`/img/product/${data.pic1}`} height="140px" alt="" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1" />
                                        <img className='mt-2 ps-2' src={`/img/product/${data.pic2}`} height="140px" alt="" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />
                                        <img className='mt-2 ps-2' src={`/img/product/${data.pic3}`} height="140px" alt="" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mt-5 ps-4" >
                            <h4>{data.name}</h4>
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Category</th>
                                        <td>{data.maincategory} / {data.subcategory}</td>
                                    </tr>
                                    <tr>
                                        <th>Brand</th>
                                        <td>{data.brand}</td>
                                    </tr>
                                    <tr>
                                        <th>Color / Size</th>
                                        <td>{data.color} / {data.size}</td>
                                    </tr>
                                    <tr>
                                        <th>Price</th>
                                        <td><del className='text-danger'>&#8377;{data.baseprice}</del> &#8377;<span >{data.finalprice}</span> <sup className='text-success'>{data.discount}%off</sup></td>
                                    </tr>
                                    <tr>
                                        <th>Stock</th>
                                        <td>{data.stock}</td>
                                    </tr>
                                    <tr>
                                        <th>Description</th>
                                        <td>{data.description}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <button className='btn btn-sm btn-dark mx-3' onClick={() => {
                                                if (qty > 1)
                                                    setQty(qty - 1)
                                            }}><span className="material-symbols-outlined">
                                                    remove
                                                </span></button>
                                            <span>{qty}</span>
                                            <button className='btn btn-sm btn-dark mx-3' onClick={() =>
                                                setQty(qty + 1)} ><span className="material-symbols-outlined">
                                                    add
                                                </span></button>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className='btn btn-warning m-2 w-100' onClick={addToWishlist}>Add to Wishlist<span className="material-symbols-outlined">
                                        grade
                                    </span></button>
                                </div>
                                <div className="col-md-12">
                                    <button className='btn btn-warning m-2 w-100' onClick={addToCart}>Add to Cart<span className="material-symbols-outlined">
                                        shopping_cart
                                    </span></button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                relatedProducts.length ?
                    <>
                        <h5 className='text-center fs-2 related'>Related Products</h5>
                        <OwlCarousel className='owl-theme w-100' loop margin={10} nav>
                            {
                                relatedProducts.map((item, index) => {

                                    return <div key={index} className="product-section  col-md-8 mb-5">
                                        <div className="con ">

                                            <div className="ms-3">
                                                <Link className="-item" to={`/product/${item.id}`}>
                                                    <img src={`/img/product/${item.pic1}`} className="img-fluid" style={{ borderRadius: "0px" }} />

                                                </Link>
                                                <div className='post-entry mt-3 '>
                                                    <h5><p href="#" className='text-dark'>{item.name}</p></h5>
                                                    <div><p href="#" className='text-dark'><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice}<sup className='text-success'>%off</sup></p></div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                })
                            }
                        </OwlCarousel>
                    </> : ""
            }
        </>
    )
}
