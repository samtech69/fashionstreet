import { takeEvery,put } from "redux-saga/effects"
import { ADD_CONTACT, ADD_CONTACT_RED, GET_CONTACT, GET_CONTACT_RED, UPDATE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT_RED, DELETE_CONTACT_RED} from "../Constants"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/ContactServices"


function* add(action){                                      //executer function
    let response = yield addRecord(action.payload)
    yield put({type:ADD_CONTACT_RED,payload:response})
}

function* get(){                                       //executer function
    let response = yield getRecord()
    yield put({type:GET_CONTACT_RED,payload:response})
}

function* update(action){                                       //executer function
    yield updateRecord(action.payload)
    yield put({type:UPDATE_CONTACT_RED,payload:action.payload})
}

function* deleteItem(action){                                       //executer function
    yield deleteRecord(action.payload)
    yield put({type:DELETE_CONTACT_RED,payload:action.payload})
}






export default function* ContactSagas(){                //watcher function
    yield takeEvery(ADD_CONTACT,add)
    yield takeEvery(GET_CONTACT,get)
    yield takeEvery(UPDATE_CONTACT,update)
    yield takeEvery(DELETE_CONTACT,deleteItem)
}