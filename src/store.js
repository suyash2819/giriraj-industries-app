import { createStore } from "redux";
import reducer from "./components/reducer";

const store = createStore(reducer);

export default store;
