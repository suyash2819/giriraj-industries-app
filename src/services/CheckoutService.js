import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/firebase";

export default async function addAddress(userid, address) {
  return db
    .collection("UserOrders")
    .doc(userid)
    .update({
      Address: firebase.firestore.FieldValue.arrayUnion(address),
    });
}
