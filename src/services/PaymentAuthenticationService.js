import "firebase/firestore";
import firebase from "firebase/app";
import axios from "axios";
import { db } from "../config/firebase";

function markPaymentVerified(verifiedOrder, userid, oldOrder) {
  db.collection("UserOrder")
    .doc(userid)
    .update({
      Orders: firebase.firestore.FieldValue.arrayUnion(verifiedOrder),
    })
    .then(() => {
      db.collection("UserOrder")
        .doc(userid)
        .update({
          Orders: firebase.firestore.FieldValue.arrayRemove(oldOrder),
        });
    });
}

function generateManualHash(generateHashUrl, order, paymentid) {
  return axios.post(generateHashUrl, {
    orderId: order.orderId,
    paymentId: paymentid,
  });
}

export default function authenticatePayment(userid, paymentid) {
  db.collection("UserOrder")
    .doc(userid)
    .get()
    .then((doc) => {
      const orders = doc.data().Orders;
      const generateHashUrl ="https://a8ithcdo7g.execute-api.ap-south-1.amazonaws.com/latest/generateHash"
        // "https://us-central1-giriraj-industries.cloudfunctions.net/generateHash";

      for (let i = 0; i < orders.length; i++) {
        if (orders[i].paymentId === paymentid) {
          generateManualHash(generateHashUrl, orders[i], paymentid).then(
            (generatedHash) => {
              if (generatedHash.data === orders[i].paymentSignature) {
                const verifiedOrder = { ...orders[i], paymentVerified: "Y" };
                markPaymentVerified(verifiedOrder, userid, orders[i]);
              } else console.log("unauthenticated source");
            }
          );
          break;
        }
      }
    });
}