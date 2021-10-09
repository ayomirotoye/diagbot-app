import { combineReducers } from "redux";
import myAppReducer from "./my-app-reducer";

const appReducer = combineReducers({
  myAppReducer: myAppReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
