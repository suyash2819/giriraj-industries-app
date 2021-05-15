/**
 * Section Service
 *
 * A Section is sort of a section in shopping mall, like Mans Section, Womans section etc.
 */
import firebase from "firebase/app";
import "firebase/firestore";

const sectionCollectionMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  covid: "Covid",
};

function formatSnapshot(snapshot) {
  return snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

export async function getItemsForSection(name) {
  const collectionName = sectionCollectionMap[name];

  return firebase
    .firestore()
    .collection(collectionName)
    .get()
    .then(formatSnapshot);
}

export async function getItemsForType(section, type) {
  const collectionName = sectionCollectionMap[section];

  return firebase
    .firestore()
    .collection(collectionName)
    .where("Item_Type", "==", type)
    .get()
    .then(formatSnapshot);
}

export async function getItemForFrontPage(collectionName) {
  return firebase
    .firestore()
    .collection(collectionName)
    .get()
    .then(formatSnapshot);
}
