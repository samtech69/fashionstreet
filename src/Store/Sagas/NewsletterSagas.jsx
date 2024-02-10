import { takeEvery,put } from "redux-saga/effects"
import { ADD_NEWSLETTER, ADD_NEWSLETTER_RED, GET_NEWSLETTER, GET_NEWSLETTER_RED,DELETE_NEWSLETTER,  DELETE_NEWSLETTER_RED} from "../Constants"
import { addRecord, deleteRecord, getRecord } from "./Services/NewsletterServices"


function* add(action){                                      //executer function
    let response = yield addRecord(action.payload)
    yield put({type:ADD_NEWSLETTER_RED,payload:response})
}

function* get(){                                       //executer function
    let response = yield getRecord()
    yield put({type:GET_NEWSLETTER_RED,payload:response})
}


function* deleteItem(action){                                       //executer function
    yield deleteRecord(action.payload)
    yield put({type:DELETE_NEWSLETTER_RED,payload:action.payload})
}




export default function* NewsletterSagas(){                //watcher function
    yield takeEvery(ADD_NEWSLETTER,add)
    yield takeEvery(GET_NEWSLETTER,get)
    yield takeEvery(DELETE_NEWSLETTER,deleteItem)
}