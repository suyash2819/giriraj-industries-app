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
