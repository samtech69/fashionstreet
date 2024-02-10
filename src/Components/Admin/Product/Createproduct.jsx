
import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'

import { addProduct } from "../../../Store/ActionCreaters/ProductAC"
import { getMaincategory } from "../../../Store/ActionCreaters/MaincategoryAC"
import { getSubcategory } from "../../../Store/ActionCreaters/SubcategoryAC"
import { getBrand } from "../../../Store/ActionCreaters/BrandAC"
import { useDispatch, useSelector } from 'react-redux'

export default function CreateProduct() {
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        baseprice: "",
        discount: "",
        finalprice: "",
        stock: "In Stock",
        description: "This is a Sample Product",
        pic1: "",
        pic2: "",
        pic3: "",
    })
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)
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
        dispatch(addProduct(item))
        navigate("/admin/product")


        //Api Code

        // var item=new FormData()
        // item.append("name",data.name)
        // item.append("maincategory",data.maincategory || maincategory[0].name)
        // item.append("subcategory",data.subcategory || subcategory[0].name)
        // item.append("brand",data.brand || brand[0].name)
        // item.append("color",data.color)
        // item.append("size",data.size)
        // item.append("baseprice",parseInt(data.baseprice))
        // item.append("discount",data.discount)
        // item.append("finalprice",fp)
        // item.append("stock",data.stock)
        // item.append("description",data.description)
        // item.append("pic1",data.pic1)
        // item.append("pic2",data.pic2)
        // item.append("pic3",data.pic3)
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
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length]
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
                                <input type="text" name='name' required minLength={3} onChange={getInputData} className='form-control' placeholder='Name' />
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Maincategory</label>
                                    <select name="maincategory" onChange={getInputData} className='form-control'>
                                        {
                                            maincategory.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Subcategory</label>
                                    <select name="subcategory" onChange={getInputData} className='form-control'>
                                        {
                                            subcategory.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Brand</label>
                                    <select name="brand" onChange={getInputData} className='form-control'>
                                        {
                                            brand.map((item, index) => {
                                                return <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-4">
                                    <label className='text-primary mb-2'>Stock</label>
                                    <select name="stock" onChange={getInputData} className='form-control'>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <input type="text" name='color' placeholder='Color' onChange={getInputData} className='form-control' required />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <input type="text" name='size' placeholder='Size' onChange={getInputData} className='form-control' required />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <input type="number" name='baseprice' placeholder='Base Price' min={0} onChange={getInputData} className='form-control' required />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <input type="number" name='discount' placeholder='Discount' min={0} onChange={getInputData} className='form-control' required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <textarea name="description" rows="5" className='form-control' placeholder='Description............' onChange={getInputData} value={data.description}></textarea>
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

