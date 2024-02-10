import { takeEvery,put } from "redux-saga/effects"
import { ADD_BRAND, ADD_BRAND_RED, GET_BRAND, GET_BRAND_RED, UPDATE_BRAND, DELETE_BRAND, UPDATE_BRAND_RED, DELETE_BRAND_RED} from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/BrandServices"


function* add(action){                                      //executer function
    let response = yield addRecord(action.payload)
    yield put({type:ADD_BRAND_RED,payload:response})
}

function* get(){                                       //executer function
    let response = yield getRecord()
    yield put({type:GET_BRAND_RED,payload:response})
}

function* update(action){                                       //executer function
    yield updateRecord(action.payload)
    yield put({type:UPDATE_BRAND_RED,payload:action.payload})
}

function* deleteItem(action){                                       //executer function
    yield deleteRecord(action.payload)
    yield put({type:DELETE_BRAND_RED,payload:action.payload})
}






export default function* BrandSagas(){                //watcher function
    yield takeEvery(ADD_BRAND,add)
    yield takeEvery(GET_BRAND,get)
    yield takeEvery(UPDATE_BRAND,update)
    yield takeEvery(DELETE_BRAND,deleteItem)
}