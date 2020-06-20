import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import optionsReducer from './options/reducer';

const rootReducer = combineReducers({
  options: optionsReducer,
});

const middlewares = applyMiddleware(reduxThunk);

export default createStore(rootReducer, middlewares);
