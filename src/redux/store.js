import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import authReducer from './users/auth.reducer';
import postReducer from "./post/post.reducers";

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
