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

export default function addUsers(user1, user2) {
  return user1 + user2;
}
