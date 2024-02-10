import { takeEvery,put } from "redux-saga/effects"
import { ADD_CHECKOUT, ADD_CHECKOUT_RED, GET_CHECKOUT, GET_CHECKOUT_RED, UPDATE_CHECKOUT, DELETE_CHECKOUT, UPDATE_CHECKOUT_RED, DELETE_CHECKOUT_RED} from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/CheckoutServices"


function* add(action){                                      //executer function
    let response = yield addRecord(action.payload)
    yield put({type:ADD_CHECKOUT_RED,payload:response})
}

function* get(){                                       //executer function
    let response = yield getRecord()
    yield put({type:GET_CHECKOUT_RED,payload:response})
}

function* update(action){                                       //executer function
    yield updateRecord(action.payload)
    yield put({type:UPDATE_CHECKOUT_RED,payload:action.payload})
}

function* deleteItem(action){                                       //executer function
    yield deleteRecord(action.payload)
    yield put({type:DELETE_CHECKOUT_RED,payload:action.payload})
}






export default function* CheckoutSagas(){                //watcher function
    yield takeEvery(ADD_CHECKOUT,add)
    yield takeEvery(GET_CHECKOUT,get)
    yield takeEvery(UPDATE_CHECKOUT,update)
    yield takeEvery(DELETE_CHECKOUT,deleteItem)
}