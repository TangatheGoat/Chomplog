//@TangatheGoat
const Favorites = require("../Controllers/Favorites.Controller");
const auth = require("../../Lib/Middleware");

module.exports = function (app) {
  // Add a food to favorites
  app.route("/favorites").post(auth.loggedIn, Favorites.addFavorite);
  
  // Get all favorites for the logged-in user
  app.route("/favorites").get(auth.loggedIn, Favorites.getFavorites);
  
  // Remove a food from favorites
  app.route("/favorites/:foodId").delete(auth.loggedIn, Favorites.removeFavorite);
  
  // Update notes for a favorite food
  app.route("/favorites/:foodId/notes").put(auth.loggedIn, Favorites.updateFavoriteNotes);
}; 
