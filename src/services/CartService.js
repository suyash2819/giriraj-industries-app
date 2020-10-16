import { db } from "../config/firebase";
import getFromDb from "../components/Utils";
import * as LocalCart from "./LocalCart";

async function localAddItem(doc, item, user) {
  let found = false;
  let dbData = [];
  if (doc.exists) {
    dbData = doc.data().Cart_Items;
    for (let i = 0; i < dbData.length; i++) {
      if (dbData[i].id === item.id) {
        dbData[i].item_num += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      item.item_num += 1;
      dbData.push(item);
    }
  } else {
    item.item_num += 1;
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
  // update store first then DB ..
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

export async function removeItem(user, el, dbData) {
  if (!!user) {
    dbData.forEach((item, index) => {
      if (item.item_num > 1 && item.id === el.id) {
        item.item_num -= 1;
      } else if (item.id === el.id && item.item_num === 1) {
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

export async function syncDBFromLocal(doc, userid) {
  let dbData = doc.data().Cart_Items;
  let localStorageData = JSON.parse(localStorage.getItem("items"));

  localStorageData.forEach((localItem, localIndex) => {
    // TO DO, to implement binary search or something more efficient
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
  return db
    .collection("UserCart")
    .doc(userid)
    .set({
      Cart_Items: dbData,
    })
    .then(() => {
      return getFromDb(userid);
    })
    .catch((err) => {
      console.log(err);
    });
}
