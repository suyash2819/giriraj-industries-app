import React from "react";
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";

import firebase from "firebase/app";
import "firebase/auth";

import store from "./store";
import { addToCart, getData, localToStore } from "./store/reducer";

import Navigation from "./components/Navigation";
import * as CartService from "./services/CartService";

function AppComponent(props) {
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // If the use is not authenticated, then load the local cart in redux store
      if (!user) {
        return props.localToStore();
      }

      return CartService.getUserCart(user.uid)
        .then((doc) => {
          // If an online cart does not exist, initialise a new cart
          if (!doc.exists) {
            return CartService.initialize(user.uid)
              .then(() => CartService.getUserCart(props.user.uid))
              .then((document) => {
                return document.data().Cart_Items;
              });
          }

          // If there are no items in the local storage, return
          // the cart items from the cart
          if (!localStorage.getItem("items")) {
            return doc.data().Cart_Items;
          }

          // If an online cart exists, and there are items in the local cart,
          // merge both carts
          return CartService.syncDBFromLocal(doc, user.uid);
        })
        .then((cartItems) => {
          localStorage.clear();

          props.getData(cartItems);
        })
        .catch(console.error);
    });
  }, []);

  return <Navigation />;
}

const mapStateToProps = (state) => ({
  cartItems: state.cartstate.cartItems,
  user: state.userstate.user,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: bindActionCreators(addToCart, dispatch),
  getData: bindActionCreators(getData, dispatch),
  localToStore: bindActionCreators(localToStore, dispatch),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);

function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppContainer;
