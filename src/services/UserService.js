import firebase from "firebase/app";
import "firebase/firestore";

export function addNewAddress(user, data) {
  const userCollection = firebase.firestore().collection("Users");
  const addressCollection = userCollection
    .doc(user.uid)
    .collection("Addresses");

  return addressCollection.add(data);
}

export function listAddresses(user) {
  const userCollection = firebase.firestore().collection("Users");
  const addressCollection = userCollection
    .doc(user.uid)
    .collection("Addresses");

  return addressCollection.get();
}

export function addNewOrders(userid, order, orderId) {
  const userCollection = firebase.firestore().collection("Users");
  return userCollection
    .doc(userid)
    .collection("Orders")
    .doc(orderId)
    .set(order);
}
