const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const initialState = {
    loading:false,
    users:[],
    error:''
}
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST"
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS"
const FETCH_USER_FAILURE = "FETCH_USER_FAILUER"

const fetchUserRequest = () => {
    return {
        type:FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload:users
    }
}

const fetchUserFailuer = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload:error
    }
}

const fetchUsers = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
            const users = res.data
            dispatch(fetchUserSuccess(users))
        })
        .catch(error => {
            dispatch(fetchUserFailuer(error.message))
        })
    }
}

const reduser = (state = initialState,action) => {
    switch(action.type){
        case FETCH_USER_REQUEST : return {
            ...state,
            loading:true
        }
        case FETCH_USER_SUCCESS : return {
            ...state,
            users:action.payload,
            loading:false,
            error:''
        }
        case FETCH_USER_FAILURE : return {
            ...state,
            users:[],
            error:action.payload
        }
    }
}

const store = createStore(reduser ,  applyMiddleware(thunkMiddleware))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())