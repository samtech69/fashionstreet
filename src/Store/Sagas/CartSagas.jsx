import { takeEvery,put } from "redux-saga/effects"
import { ADD_CART, ADD_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, DELETE_CART, UPDATE_CART_RED, DELETE_CART_RED} from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/CartServices"


function* add(action){                                      //executer function
    let response = yield addRecord(action.payload)
    yield put({type:ADD_CART_RED,payload:response})
}

function* get(){                                       //executer function
    let response = yield getRecord()
    yield put({type:GET_CART_RED,payload:response})
}

function* update(action){                                       //executer function
    yield updateRecord(action.payload)
    yield put({type:UPDATE_CART_RED,payload:action.payload})
}

function* deleteItem(action){                                       //executer function
    yield deleteRecord(action.payload)
    yield put({type:DELETE_CART_RED,payload:action.payload})
}






export default function*CartSagas(){                //watcher function
    yield takeEvery(ADD_CART,add)
    yield takeEvery(GET_CART,get)
    yield takeEvery(UPDATE_CART,update)
    yield takeEvery(DELETE_CART,deleteItem)
}