import { db } from "../config/firebase";

export function getFromDb(userId) {
  return new Promise((resolve, reject) => {
    db.collection("UserCart")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data().Cart_Items);
        } else {
          reject("No such document!");
        }
      });
  });
}

export function updateDBFromLocal(doc, userid) {
  let dbData = doc.data().Cart_Items;
  let localStorageData = JSON.parse(localStorage.getItem("items"));

  localStorageData.forEach((localItem, localIndex) => {
    //TO DO, to implement binary search or something more efficient
    let found = false;
    for (let dbIndex = 0; dbIndex < dbData.length; dbIndex++) {
      if (dbData[dbIndex].id === localItem.id) {
        found = true;
        dbData[dbIndex].item_num += localStorageData[localIndex].item_num;
        break;
      }
    }
    if (!found) {
      dbData.push(localStorageData[localIndex]);
    }
  });
  let promise = db.collection("UserCart").doc(userid).set({
    Cart_Items: dbData,
  });
  return promise;
}
