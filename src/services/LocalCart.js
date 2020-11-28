// add Item to Local storage
export async function addItem(item) {
  let found = false;
  let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
  let updatedItems = [...localStorageItems];

  if (updatedItems.length === 0) {
    updatedItems.push(item);
  } else {
    updatedItems.forEach((localItem) => {
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
  const localStorageData = JSON.parse(localStorage.getItem("items"));
  const data = Object.create(dbData);

  localStorageData.forEach((localItem, localIndex) => {
    // TO DO, to implement binary search or something more efficient
    let found = false;

    for (let dbIndex = 0; dbIndex < dbData.length; dbIndex++) {
      if (dbData[dbIndex].CompositeKey === localItem.CompositeKey) {
        found = true;
        data[dbIndex].Quantity += localStorageData[localIndex].Quantity;
        break;
      }
    }

    if (!found) {
      data.push(localStorageData[localIndex]);
    }
  });

  return data;
}

export function updateLocalQuantityOfItem(cartItems) {
  localStorage.setItem("items", JSON.stringify(cartItems));
}
