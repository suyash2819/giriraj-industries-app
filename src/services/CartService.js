import { db } from "../config/firebase";
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

// Add item to cart
export async function addItem(user, item) {
  if (user) {
    // Update in firebase
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

// Remove item from cart
export function removeItem(user, item) {
  if (user) {
    // Update in firebase
  }

  // Update in local
}

// Sync cart with db
function syncLocalCart(user) {
  // Get local state
  // Get db state
  // Comupte aggregated
  // Update local and db
}

function getCart(user) {
  if (user) {
    //
  }
}
