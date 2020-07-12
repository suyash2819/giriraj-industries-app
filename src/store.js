import { createStore } from 'redux';
import cartReducer from './components/reducer';

const store = createStore(cartReducer);

export default store;