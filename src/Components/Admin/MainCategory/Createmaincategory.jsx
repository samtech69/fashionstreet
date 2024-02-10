
import React, { useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'

import { addMaincategory, getMaincategory } from "../../../Store/ActionCreaters/MaincategoryAC"
import { useDispatch, useSelector } from 'react-redux'

export default function Createmaincategory() {
    let name = useRef("")
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    function getInputData(e) {
        name.current = e.target.value
    }
    async function postData(e) {
        e.preventDefault()
        let item = MaincategoryStateData.length && MaincategoryStateData.slice(1).find((x) => x.name === name.current)
        if (item)
            alert("Maincategory name already exist")
        else {
            dispatch(addMaincategory({ name: name.current }))
            navigate("/admin/maincategory")
        }

    }
    function getAPIData() {
        dispatch(getMaincategory())
    }
    useEffect(() => {
        getAPIData()
    }, [MaincategoryStateData.length]
    )

    return (
        <>
            <div className="container-fluid adminpage my-5">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="bg-warning text-center p-2 my-2">Maincategory</div>
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

