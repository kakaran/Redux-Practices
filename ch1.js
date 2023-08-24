import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";



//action Name 

const postDataFulfilled = "postData/init";
const postDataRejected = "postData/init/rejected";
const postDataPending = "postData/init/pending";

//store
const store = createStore(postReducer, applyMiddleware(logger.default, thunk.default));



//reducer

function postReducer(state = { posts: [] }, action) {
    if (action.type === postDataFulfilled) return { posts: action.payload, pending: false }
    if (action.type === postDataRejected) return { posts: { ...state }, pending: false, error: action.error }
    if (action.type === postDataPending) return { posts: { ...state }, pending: true }
    return state.posts
}

//Action Creater

function postData(value) {
    return { type: postDataFulfilled, payload: value }
}

function postDataReject(error) {
    return { type: postDataRejected, error: error }
}

function postDataLoading() {
    return { type: postDataPending }
}

store.subscribe(() => {
})

async function getData(dispatch, getData) {
    try {
        dispatch(postDataLoading())
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
        // console.log(data);
        const sortedData = await data.sort((a, b) => a.title.localeCompare(b.title))
        dispatch(postData(sortedData[0]))
    } catch (error) {
        dispatch(postDataReject(error.message))
    }
}


store.dispatch(getData)