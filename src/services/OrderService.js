import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../config/firebase";
import authenticatePayment from "./PaymentAuthenticationService";

export default function handleOrders(userid, order) {
  db.collection("UserOrder")
    .doc(userid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        db.collection("UserOrder")
          .doc(userid)
          .update({
            Orders: firebase.firestore.FieldValue.arrayUnion(order),
          })
          .then(() => {
            authenticatePayment(userid, order.paymentId);
          });
      } else {
        db.collection("UserOrder")
          .doc(userid)
          .set({
            Orders: [order],
          })
          .then(() => {
            authenticatePayment(userid, order.paymentId);
          });
      }
    });
}
