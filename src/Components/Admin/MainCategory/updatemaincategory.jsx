
import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'

import { updateMaincategory, getMaincategory } from "../../../Store/ActionCreaters/MaincategoryAC"
import { useDispatch, useSelector } from 'react-redux'

export default function Updatemaincategory() {
    let [name,setName] = useState("")
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let {id}=useParams()
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    
    function getInputData(e) {
        setName(e.target.value)
    }


    async function postData(e) {
        e.preventDefault()
        let item = MaincategoryStateData.length && MaincategoryStateData.slice(1).find((x) => x.name === name)
        if (item)
            alert("Maincategory name already exist")
        else {
            dispatch(updateMaincategory({id:id, name:name }))
            navigate("/admin/maincategory")
        }

    }


    function getAPIData() {
        dispatch(getMaincategory())
        if(MaincategoryStateData.length){
            let item=MaincategoryStateData.slice(1).find((x)=>x.id===Number(id))
            if (item)
            setName(item.name)

        }
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
                                <input type="text" value={name} name='name' required minLength={3} maxLength={15} onChange={getInputData} className='form-control' placeholder='Name' />
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

