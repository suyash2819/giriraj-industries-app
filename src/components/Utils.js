import { db } from "../config/firebase";

export default async function getFromDb(userId) {
  return db
    .collection("UserCart")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data().Cart_Items;
      }
      return new Error("No such document!");
    });
}

export const validPincode = RegExp(/^[1-9](\d{5})$/i);
export const validPhonenumber = RegExp(/^[0-9]\d{9}$/i);
