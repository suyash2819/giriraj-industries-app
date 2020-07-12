const ADD_TO_CART = 'ADD_TO_CART';

export function addToCart(payload) {
    return {
        type: ADD_TO_CART,
        payload,
    };
}

const initialState = {
    cartItems: [],
};

export default function cartReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case ADD_TO_CART:
            console.log('state',state);
            return { ...state, cartItems: payload };

        default:
            return state;
    }
} 