const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware
function buyCake (){
    return {
        type:BUY_CAKE,
        info: "First redux action"
    }    
}
function buyIcecream (){
    return {
        type:BUY_ICECREAM,
        info: "First icecream action"
    }    
}
//state
const initialState = {
    numOfCakes : 10,
    numOfIceCream : 20 ,
}

const reducer = (state = initialState,action) => {
    switch(action.type){
        case BUY_CAKE : return {
            ...state,
            numOfCakes : state.numOfCakes - 1
        }
        case BUY_ICECREAM : return {
            ...state,
            numOfIceCream : state.numOfIceCream - 1
        }
        default : return state
    }
}


const store = createStore(reducer,applyMiddleware(logger))
console.log('Initial State',store.getState())
const unsubscribe = store.subscribe(() => {})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

unsubscribe()