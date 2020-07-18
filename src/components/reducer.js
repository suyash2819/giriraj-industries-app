const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

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

const initialState = {
    cartItems: [],
};

export default function cartReducer(state = initialState, action) {
    const { payload, type } = action;

    // todo dont use localStorage when the user is logged in
    let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
    let updatedItem = !!state.cartItems.length ? [...state.cartItems] : localStorageItems;

    switch (type) {
        case ADD_TO_CART:
            updatedItem.push(payload);
            localStorage.setItem("items", JSON.stringify(updatedItem));
            return { ...state, cartItems: updatedItem };
        case REMOVE_FROM_CART:
            for (let index = 0; index < updatedItem.length; index++) {
                if (updatedItem[index].id === payload.id) {
                    updatedItem.splice(index, 1);
                    break;
                }
            }
            if (!!updatedItem.length) {
                localStorage.setItem("items", JSON.stringify(updatedItem));
            } else {
                localStorage.clear();
            }
            return { ...state, cartItems: updatedItem };

        default:
            return state;
    }
} 