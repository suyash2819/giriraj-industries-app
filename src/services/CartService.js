import { db } from "../config/firebase";
import getFromDb from "../components/Utils";
import * as LocalCart from "./LocalCart";

// adds Item to cart, called by addItem
async function localAddItem(doc, item, user) {
  let found = false;
  let dbData = [];
  if (doc.exists) {
    dbData = doc.data().Cart_Items;
    for (let i = 0; i < dbData.length; i++) {
      if (dbData[i].CompositeKey === item.CompositeKey) {
        found = true;
        break;
      }
    }
    if (!found) {
      dbData.push(item);
    }
  } else {
    dbData.push(item);
  }

  return db
    .collection("UserCart")
    .doc(user.uid)
    .set({
      Cart_Items: dbData,
    })
    .then(() => {
      return dbData;
    });
}

export async function addItem(user, item) {
  // TO DO update store first then DB ..
  if (!!user) {
    return db
      .collection("UserCart")
      .doc(user.uid)
      .get()
      .then((doc) => {
        return localAddItem(doc, item, user);
      });
  }

  return LocalCart.addItem(item);
}

// Remove Item from cart
export async function removeItem(user, el, dbData) {
  if (!!user) {
    dbData.forEach((item, index) => {
      if (item.CompositeKey === el.CompositeKey) {
        dbData.splice(index, 1);
      }
    });
    db.collection("UserCart").doc(user.uid).set({
      Cart_Items: dbData,
    });
    return dbData;
  }

  return LocalCart.removeItem(el);
}

// sync db data with local storage data
export async function syncDBFromLocal(dbCart, userid) {
  const updatedData = LocalCart.searchLocalForDbItem(dbCart.Cart_Items);

  return db
    .collection("UserCart")
    .doc(userid)
    .set({
      Cart_Items: updatedData,
    })
    .then(() => {
      return { Cart_Items: updatedData };
    });
}

//  update the quantity of item
export function updateQuantityOfItem(cartItems, user) {
  if (!!user) {
    db.collection("UserCart").doc(user.uid).set({
      Cart_Items: cartItems,
    });
  } else {
    LocalCart.updateLocalQuantityOfItem(cartItems);
  }
}

export function getUserCart(uid) {
  return db.collection("UserCart").doc(uid).get();
}

export function initialize(uid) {
  const cartItems = JSON.parse(localStorage.getItem("items")) || [];

  return db
    .collection("UserCart")
    .doc(uid)
    .set({
      Cart_Items: cartItems,
    })
    .then(() => {
      return { Cart_Items: cartItems };
    });
}
