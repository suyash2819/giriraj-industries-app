export async function addItem(item) {
  let found = false;
  let localStorageItems = JSON.parse(localStorage.getItem("items")) || [];
  let updatedItems = localStorageItems;

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

export async function removeItem(item) {}
