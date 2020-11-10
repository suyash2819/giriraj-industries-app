// add Item to Local storage
export async function addItem(item) {
  console.log("addItem called");
  let found = false;
  let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
  let updatedItems = [...localStorageItems];

  if (updatedItems.length === 0) {
    console.log("hi");
    updatedItems.push(item);
  } else {
    updatedItems.forEach((localItem, index, updatedItems) => {
      if (localItem.CompositeKey === item.CompositeKey) found = true;
    });
    if (!found) {
      updatedItems.push(item);
    }
  }

  localStorage.setItem("items", JSON.stringify(updatedItems));

  return updatedItems;
}

// Remove Item from local storage
export async function removeItem(item) {
  let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
  let updatedItems = [...localStorageItems];
  for (let index = 0; index < updatedItems.length; index++) {
    if (updatedItems[index].CompositeKey === item.CompositeKey) {
      updatedItems.splice(index, 1);
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
      if (dbData[dbIndex].CompositeKey === localItem.CompositeKey) {
        console.log("found");
        found = true;
        // dbData[dbIndex].item_num += localStorageData[localIndex].item_num;
        break;
      }
    }
    if (!found) {
      dbData.push(localStorageData[localIndex]);
    }
  });
  return dbData;
}

export function updateLocalQuantityOfItem(cartItems) {
  localStorage.setItem("items", JSON.stringify(cartItems));
}

export async function addNewLocalProperty(value, item) {
  let localStorageItems = JSON.parse(localStorage.getItem("items"));
  let updatedItems = [...localStorageItems];

  //  Quantity Property used here, if name changes in db make sure to do it here too
  updatedItems.forEach((localItem, localIndex, updatedItems) => {
    if (localItem.CompositeKey === item.CompositeKey) {
      updatedItems[localIndex].Quantity = value;
    }
  });

  return updatedItems;
}
