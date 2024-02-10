
import React, { useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'

import { addSubcategory, getSubcategory } from "../../../Store/ActionCreaters/SubcategoryAC"
import { useDispatch, useSelector } from 'react-redux'

export default function CreateSubcategory() {
    let name = useRef("")
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    function getInputData(e) {
        name.current = e.target.value
    }
    async function postData(e) {
        e.preventDefault()
        let item = SubcategoryStateData.length && SubcategoryStateData.slice(1).find((x) => x.name === name.current)
        if (item)
            alert("Subcategory name already exist")
        else {
            dispatch(addSubcategory({ name: name.current }))
            navigate("/admin/subcategory")
        }

    }
    function getAPIData() {
        dispatch(getSubcategory())
    }
    useEffect(() => {
        getAPIData()
    }, [SubcategoryStateData.length]
    )

    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Subcategory</div>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" name='name' required minLength={3} maxLength={15} onChange={getInputData} className='form-control' placeholder='Name' />
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

