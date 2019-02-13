
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from "redux-logger";


const mathReducer =(state={
    result: 1,
    lastValue:[]
}, action)=>{
    switch(action.type){
        case "ADD":
          state={
            ...state,
            result: state.result + action.payload,
            lastValue: [...state.lastValue, action.payload]
          }
          break;
        case "SUBTRACT":
          state={
            ...state,
            result: state.result - action.payload,
            lastValue: [...state.lastValue, action.payload]
          }
          break;
    }
    return state;
};

const userReducer =(state={
    name: 'Mohammad Ibrahim',
    age:34
}, action)=>{
    switch(action.type){
        case "SET_NAME":
          state={
            ...state,
            name: action.payload

          }
          break;
        case "SET_AGE":
          state={
            ...state,
            age: action.payload
          }
          break;
    }
    return state;
};
const myLogger = (store)=>(next)=>(action)=>{
  console.log("Logged Action:", action);
  next(action);
};
const logger=createLogger({
  predicate: (getState, action) => action.type,
  collapsed: (getState, action) => action.type,
  duration: false,
  timestamp: true 
});
//  const composeEnhancers =
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//       // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//     }) : compose;
// const enhancers = composeEnhancers(
//     applyMiddleware(myLogger, logger),
// );

// const store = createStore(combineReducers({mathReducer, userReducer}), enhancers);

const store = createStore(combineReducers({mathReducer, userReducer}), {}, applyMiddleware(myLogger, logger));

store.subscribe(()=>{
    console.log("Store Updated!!",store.getState());
});
store.dispatch({
    type: "ADD",
    payload: 90
});
store.dispatch({
    type: "ADD",
    payload: 22
});
store.dispatch({
    type: "SUBTRACT",
    payload: 100
});
store.dispatch({
    type: "SET_AGE",
    payload: 40
});