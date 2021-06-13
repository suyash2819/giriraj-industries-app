import { combineReducers } from "redux";

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const SET_USER_SESSION = "SET_USER_SESSION";
const LOADER = "DISPLAY_LOADER";
const GET_DATA = "GET_DATA_FROM_DB";
const LOCAL_TO_STORE = "LOCAL_TO_STORE";

export function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload,
  };
}

export function removeFromCart(payload) {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
}

export function setUserSession(payload) {
  return { type: SET_USER_SESSION, payload };
}

export function displayLoader(payload) {
  return {
    type: LOADER,
    payload,
  };
}

export function getData(payload) {
  return {
    type: GET_DATA,
    payload,
  };
}

export function localToStore() {
  return {
    type: LOCAL_TO_STORE,
  };
}

const cartinitialState = {
  cartItems: [],
};

const userinitialState = {
  user: null,
};

const loaderinitialstate = {
  loader: true,
};

export function cartReducer(state = cartinitialState, action) {
  const { payload, type } = action;
  let updatedItem = [];

  if (!!payload && !!payload.userstate) {
  } else {
    const localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
    updatedItem = localStorageItems;
  }

  switch (type) {
    case ADD_TO_CART: {
      return { ...state, cartItems: payload.data };
    }

    case REMOVE_FROM_CART: {
      return { ...state, cartItems: payload.data };
    }

    case LOCAL_TO_STORE:
      return { ...state, cartItems: updatedItem };

    case GET_DATA:
      updatedItem = payload;
      return { ...state, cartItems: updatedItem };

    default:
      return state;
  }
}

export function userReducer(state = userinitialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SET_USER_SESSION:
      return { ...state, user: payload };
    default:
      return state;
  }
}

export function loaderReducer(state = loaderinitialstate, action) {
  const { payload, type } = action;
  switch (type) {
    case LOADER:
      return { ...state, loader: payload };
    default:
      return state;
  }
}

export default combineReducers({
  cartstate: cartReducer,
  userstate: userReducer,
  loaderstate: loaderReducer,
});
