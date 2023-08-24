import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";


const inc = "account/increment";
const dec = "account/decrement";
const incByAmount = "account/incrementByAmount";
const getDataFulFilled = "account/init"
const getDataPending = "account/init/pending"
const getDataRejected = "account/init/rejected"
const incBonus = "bonus/increment"

//store
const store = createStore(combineReducers({
    account: accountReducer,
    bonus: bonusReducer
}), applyMiddleware(logger.default, thunk.default));

//aray
const history = []

//reducer
function accountReducer(state = { amount: 1 }, action) {
    if (action.type === inc) return { amount: state.amount + 1 }
    if (action.type === dec) return { amount: state.amount - 1 }
    if (action.type === incByAmount) return { amount: state.amount + action.payload }
    if (action.type === getDataFulFilled) return { amount: action.payload, pending: false }
    if (action.type === getDataPending) return { amount: state.amount, pending: true }
    if (action.type === getDataRejected) return { amount: state.amount, pending: false, error: action.error }
    return state
}

function bonusReducer(state = { point: 0 }, action) {
    if (action.type === incByAmount) if (action.payload >= 100) return { point: state.point + 1 }
    if (action.type === incBonus) return { point: state.point + 1 }
    return state
}

//global State
// store.subscribe(() => {
//     history.push(store.getState())
//     console.log(history);
// })


//Action Creators
function increment() {
    return { type: inc }
}

function decrement() {
    return { type: dec }
}

function incrementByAmount(value) {
    return { type: incByAmount, payload: value }
}

function init(value) {
    return { type: getDataFulFilled, payload: value }
}

function incrementBonus() {
    return { type: incBonus }
}

function getDataReject(error) {
    return { type: getDataRejected, error: error }
}

function getDataPendingResponse() {
    return { type: getDataPending }
}


async function getData(dispatch, getData) {
    try {
        dispatch(getDataPendingResponse())
        const { data } = await axios.get("https://tempapi.proj.me/api/kitya7ab3")
        dispatch(init(data.amount))
    } catch (error) {
        dispatch(getDataReject(error.message))
    }
}



//action
// setInterval(() => {
store.dispatch(getData)
// }, 2000);