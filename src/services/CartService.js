import { db } from "../config/firebase";

// Add item to cart
function addItem(user, item) {
  if (user) {
    // Update in firebase
  }

  LocalCart.addItem(item);
}

// Remove item from cart
function removeItem(user, item) {
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

function getCart (user) {
  if (user) {
    // 
  }

  
}