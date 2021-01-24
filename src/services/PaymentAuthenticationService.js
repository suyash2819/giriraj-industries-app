import "firebase/firestore";
import firebase from "firebase/app";
import axios from "axios";
import { db } from "../config/firebase";

export default function authenticatePayment(userid, paymentid) {
  db.collection("UserOrder")
    .doc(userid)
    .get()
    .then((doc) => {
      const orders = doc.data().Orders;

      for (let i = 0; i < orders.length; i++) {
        if (orders[i].paymentId === paymentid) {
          axios
            .post(
              "https://us-central1-giriraj-industries.cloudfunctions.net/generateHash",
              { orderId: orders[i].orderId, paymentId: paymentid }
            )
            .then((generatedHash) => {
              if (generatedHash.data === orders[i].paymentSignature) {
                const verifiedOrder = { ...orders[i], paymentVerified: "Y" };
                db.collection("UserOrder")
                  .doc(userid)
                  .update({
                    Orders: firebase.firestore.FieldValue.arrayUnion(
                      verifiedOrder
                    ),
                  })
                  .then(() => {
                    db.collection("UserOrder")
                      .doc(userid)
                      .update({
                        Orders: firebase.firestore.FieldValue.arrayRemove(
                          orders[i]
                        ),
                      });
                  });
              } else console.log("unauthenticated source");
            });
          break;
        }
      }
    });
}
