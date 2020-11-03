// add Item to Local storage
export async function addItem(item) {
  let found = false;
  let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
  let updatedItems = [...localStorageItems];

  localStorageItems.forEach((localItem, index, updatedItem) => {
    if (localItem.id !== item.id) return;

    updatedItem[index].item_num += 1;
    found = true;
  });

  if (!found) {
    item.item_num += 1;
    updatedItems.push(item);
  }

  localStorage.setItem("items", JSON.stringify(updatedItems));

  return updatedItems;
}

// Remove Item from local storage
export async function removeItem(item) {
  let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
  let updatedItems = [...localStorageItems];
  for (let index = 0; index < updatedItems.length; index++) {
    if (updatedItems[index].id === item.id) {
      if (updatedItems[index].item_num > 1) {
        updatedItems[index].item_num -= 1;
      } else updatedItems.splice(index, 1);
      break;
    }
  }
  if (!!updatedItems.length) {
    localStorage.setItem("items", JSON.stringify(updatedItems));
  } else {
    localStorage.clear();
  }
  return updatedItems;
}

// search local storage for item in db
export function searchLocalForDbItem(dbData) {
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
  return dbData;
}
