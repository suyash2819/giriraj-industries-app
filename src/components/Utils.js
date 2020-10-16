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
