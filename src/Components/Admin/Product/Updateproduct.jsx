
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'

import { updateProduct, getProduct } from "../../../Store/ActionCreaters/ProductAC"
import { getMaincategory } from "../../../Store/ActionCreaters/MaincategoryAC"
import { getSubcategory } from "../../../Store/ActionCreaters/SubcategoryAC"
import { getBrand } from "../../../Store/ActionCreaters/BrandAC"
import { useDispatch, useSelector } from 'react-redux'

export default function UpdateProduct() {
    let [data, setData] = useState({})
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { id } = useParams()
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)

    let ProductStateData = useSelector((state) => state.ProductStateData)

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
        let fp = Math.round(data.baseprice - data.baseprice * data.discount / 100)
        var item = {
            id:id,
            name: data.name,
            maincategory: data.maincategory || maincategory[0].name,
            subcategory: data.subcategory || subcategory[0].name,
            brand: data.brand || brand[0].name,
            color: data.color,
            size: data.size,
            baseprice:parseInt(data.baseprice),
            discount: parseInt(data.discount),
            finalprice: fp,
            stock: data.stock,
            description: data.description,
            pic1: data.pic1,
            pic2: data.pic2,
            pic3: data.pic3,
        }
        dispatch(updateProduct(item))
        navigate("/admin/product")
    }


    function getAPIData() {
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        if (MaincategoryStateData.length) {
            setMaincategory(MaincategoryStateData.slice(1).reverse())
        }
        if (SubcategoryStateData.length) {
            setSubcategory(SubcategoryStateData.slice(1).reverse())
        }
        if (BrandStateData.length) {
            setBrand(BrandStateData.slice(1).reverse())
        }
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.slice(1).find((x) => x.id === Number(id))
            if (item)
                setData({ ...item })

        }
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length, MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length]
    )

    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Product</div>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" value={data.name} name='name' required minLength={3} onChange={getInputData} className='form-control' placeholder='Name' />
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Maincategory</label>
                                    <select name="maincategory" onChange={getInputData} value={data.maincategory} className='form-control'>
                                        {
                                            maincategory.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Subcategory</label>
                                    <select name="subcategory" onChange={getInputData} value={data.subcategory} className='form-control'>
                                        {
                                            subcategory.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Brand</label>
                                    <select name="brand" onChange={getInputData} value={data.brand} className='form-control'>
                                        {
                                            brand.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Stock</label>
                                    <select name="stock" onChange={getInputData} value={data.stock} className='form-control'>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <input type="text" name='color' placeholder='Color' value={data.color} onChange={getInputData} className='form-control' required />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <input type="text" name='size' placeholder='Size' value={data.size} onChange={getInputData} className='form-control' required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <input type="number" name='baseprice' placeholder='Base Price' value={data.baseprice} min={0} onChange={getInputData} className='form-control' required />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <input type="number" name='discount' placeholder='Discount' min={0} value={data.discount} onChange={getInputData} className='form-control' required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <textarea name="description" rows="5" className='form-control' value={data.description} placeholder='Description............' onChange={getInputData}></textarea>
                            </div>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label>Picture 1</label>
                                    <input type="file" name='pic1' onChange={getInputFile} className='form-control' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Picture 2</label>
                                    <input type="file" name='pic2' onChange={getInputFile} className='form-control' />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Picture 3</label>
                                    <input type="file" name='pic3' onChange={getInputFile} className='form-control' />
                                </div>
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

