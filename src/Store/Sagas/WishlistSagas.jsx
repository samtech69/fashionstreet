import { takeEvery,put } from "redux-saga/effects"
import { ADD_WISHLIST, ADD_WISHLIST_RED, GET_WISHLIST, GET_WISHLIST_RED, DELETE_WISHLIST, DELETE_WISHLIST_RED} from "../Constants"
import { addRecord, deleteRecord, getRecord } from "./Services/WishlistServices"


function* add(action){                                      //executer function
    let response = yield addRecord(action.payload)
    yield put({type:ADD_WISHLIST_RED,payload:response})
}

function* get(){                                       //executer function
    let response = yield getRecord()
    yield put({type:GET_WISHLIST_RED,payload:response})
}


function* deleteItem(action){                                       //executer function
    yield deleteRecord(action.payload)
    yield put({type:DELETE_WISHLIST_RED,payload:action.payload})
}






export default function* WishlistSagas(){                //watcher function
    yield takeEvery(ADD_WISHLIST,add)
    yield takeEvery(GET_WISHLIST,get)
    yield takeEvery(DELETE_WISHLIST,deleteItem)
}