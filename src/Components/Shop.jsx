import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { getMaincategory } from "../Store/ActionCreaters/MaincategoryAC"
import { getSubcategory } from "../Store/ActionCreaters/SubcategoryAC"
import { getBrand } from "../Store/ActionCreaters/BrandAC"
import { getProduct } from "../Store/ActionCreaters/ProductAC"

export default function Shop() {
    let [product, setProduct] = useState([])
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])

    let [mc, setMc] = useState("All")
    let [sc, setSc] = useState("All")
    let [br, setBr] = useState("All")

    let [min, setMin] = useState(0)
    let [max, setMax] = useState(2000)

    let [flag, setFlag] = useState(true)
    let [search, setSearch] = useState("")

    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)

    function categoryFilter(mc, sc, br, min = -1, max = -1) {
        setMc(mc)
        setSc(sc)
        setBr(br)
        let data = []
        if (mc === 'All' && sc === 'All' && br === 'All')
            data = ProductStateData.slice(1).reverse()
        else if (mc !== 'All' && sc === 'All' && br === 'All')
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc)

        else if (mc === 'All' && sc !== 'All' && br === 'All')
            data = ProductStateData.slice(1).reverse().filter((x) => x.subcategory === sc)
        else if (mc === 'All' && sc === 'All' && br !== 'All')
            data = ProductStateData.slice(1).reverse().filter((x) => x.brand === br)

        else if (mc !== 'All' && sc !== 'All' && br === 'All')
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc && x.subcategory === sc)
        else if (mc !== 'All' && sc === 'All' && br !== 'All')
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc && x.brand === br)
        else if (mc === 'All' && sc !== 'All' && br !== 'All')
            data = ProductStateData.slice(1).reverse().filter((x) => x.subcategory === sc && x.brand === br)
        else
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc && x.subcategory === sc && x.brand === br)
        if (min === -1 && max === -1)
            setProduct(data)
        else
            setProduct(data.filter((x) => x.finalprice >= min && x.finalprice <= max))
    }

    function getPriceFilter(e) {
        var { name, value } = e.target
        if (name === "min")
            setMin(value)
        else
            setMax(value)
    }

    function applyPriceFilter() {
        categoryFilter(mc, sc, br, min, max)
    }


    function getSortFilter(e) {
        let { value } = e.target
        if (value === "1")
            setProduct(product.sort((x, y) => y.id - x.id))
        else if (value === "2")
            setProduct(product.sort((x, y) => y.finalprice - x.finalprice))
        else
            setProduct(product.sort((x, y) => x.finalprice - y.finalprice))

        flag ? setFlag(false) : setFlag(true)

    }



    function postSearch(e) {
        e.preventDefault()
        setProduct(ProductStateData.slice(1).reverse().filter((x) => x.name.toLowerCase().includes(search) || x.maincategory.toLowerCase() === search
            || x.subcategory.toLowerCase() === search
            || x.brand.toLowerCase() === search
            || x.color.toLowerCase() === search
            || x.size.toLowerCase() === search
            || x.maincategory.toLowerCase().includes(search)))
    }

    function getApiData() {
        dispatch(getProduct())
        if (ProductStateData.length)
            setProduct(ProductStateData.slice(1).reverse())

        dispatch(getMaincategory())
        if (MaincategoryStateData.length)
            setMaincategory(MaincategoryStateData.slice(1).reverse())

        dispatch(getSubcategory())
        if (SubcategoryStateData.length)
            setSubcategory(SubcategoryStateData.slice(1).reverse())

        dispatch(getBrand())
        if (BrandStateData.length)
            setBrand(BrandStateData.slice(1).reverse())
    }

    useEffect(() => {
        getApiData()
    }, [ProductStateData.length, MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])



    return (
        <>
            <div className="container-fluid" style={{ margin: "130px 0px" }}>
                <div className='mb-5 container-fluid'>
                    <div className='breadcrum  py-2 '>
                        <Link to="/">Home</Link><span>&nbsp;--&nbsp;</span><Link to="/shop">Shop</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 ps-5 pe-5">
                        <div className="list-group listy">
                            <Link to="#" className="list-group-item list-group-item-action" id='owl-next'>
                                Maincategory
                            </Link>
                            <button to="#" className="list-group-item list-group-item-action " onClick={() => categoryFilter('All', sc, br)}>All</button>
                            {
                                maincategory.map((item, index) => {
                                    return <button key={index} className="list-group-item list-group-item-action " onClick={() => categoryFilter(item.name, sc, br)}>{item.name}</button>

                                })
                            }
                        </div>

                        <div className="list-group listy my-3">
                            <Link to="#" className="list-group-item list-group-item-action " id='owl-next'>
                                Subcategory
                            </Link>
                            <button to="#" className="list-group-item list-group-item-action" onClick={() => categoryFilter(mc, 'All', br)}>All</button>
                            {
                                subcategory.map((item, index) => {
                                    return <button key={index} className="list-group-item list-group-item-action" onClick={() => categoryFilter(mc, item.name, br)}>{item.name}</button>

                                })
                            }
                        </div>

                        <div className="list-group listy my-3">
                            <Link to="#" className="list-group-item list-group-item-action " id='owl-next'>
                                Brand
                            </Link>
                            <button to="#" className="list-group-item list-group-item-action" onClick={() => categoryFilter(mc, sc, 'All')}>All</button>
                            {
                                brand.map((item, index) => {
                                    return <button key={index} className="list-group-item list-group-item-action" onClick={() => categoryFilter(mc, sc, item.name)}>{item.name}</button>

                                })
                            }
                        </div>
                        <h5 className='filtering fs-6' >Price Filter</h5>

                        <div className="row">
                            <div className="col-md-6">
                                <label >Minimum</label>
                                <input type="number" name='min' onChange={getPriceFilter} placeholder='Min Ammount' className='form-control' value={min} />
                            </div>
                            <div className="col-md-6">
                                <label >Maximum</label>
                                <input type="number" name='max' onChange={getPriceFilter} placeholder='Max Ammount' className='form-control' value={max} />
                            </div>
                        </div>
                        <div className="my-3">
                            <button className='btn btn-warning w-100' onClick={applyPriceFilter}>Apply</button>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-9">
                                <form onSubmit={postSearch}>
                                    <div className="mb-3 btn-group w-100">
                                        <input type="search" name="search" onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Enter Search' className='form-control' />
                                        <button type="submit" className='btn btn-warning' style={{ height: "50px" }}>Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-3">
                                <select name="sortFilter" onChange={getSortFilter} className='form-control'>
                                    <option value="1">Latest Product</option>
                                    <option value="2">Price: High to Low</option>
                                    <option value="3">Price: Low to High</option>
                                </select>
                            </div>
                        </div>

                        <div className="container" >
                            {/* <div className="row mb-5">
                                <h2 className="text-center">Shop</h2>
                            </div> */}

                            <div className="row">
                                {
                                    product.map((item, index) => {

                                        return <div key={index} className="product-section  col-md-3 mb-5">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <Link className="product-item" to={`/product/${item.id}`}>
                                                            <img src={`/img/product/${item.pic1}`} className="img-fluid" style={{ borderRadius: "50px" }} />
                                                            <span className="icon-cross">
                                                                <h5 className='image-fluid'>Quick Add</h5>
                                                            </span>
                                                        </Link>
                                                        <div className='post-entry mt-3'>
                                                            <h5><p href="#" className='text-dark'>{item.name}</p></h5>
                                                            <div><p href="#" className='text-dark'><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice}<sup className='text-success'>%off</sup></p></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
