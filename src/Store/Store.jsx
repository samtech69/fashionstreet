import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware  from "redux-saga"
import RootSagas from "./Sagas/RootSagas"
import RootReducer from "./Reducers/RootReducer"


const SagaMiddleware = createSagaMiddleware()

const Store = configureStore({
    reducer: RootReducer,
    middleware: () => [SagaMiddleware]
})

export default Store

SagaMiddleware.run(RootSagas)