import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import admin from "react-admin-table/dist/redux/admin";

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
  admin,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
