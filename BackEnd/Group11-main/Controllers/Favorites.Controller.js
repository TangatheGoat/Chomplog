//@TangatheGoat 
const Favorites = require("../Models/Favorites.Models");
const Joi = require("joi");
const Users = require("../Models/Users.Models");

/**
 * Add a food to user's favorites
 */
const addFavorite = (req, res) => {
  // Validate request body
  const schema = Joi.object({
    foodId: Joi.number().required(),
    notes: Joi.string().allow('', null)
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ error_message: error.details[0].message });
  }
  
  // Get user ID from auth token
  const token = req.get("Authorization");
  Users.getId(token, (err, userId) => {
    if (err) return res.status(500).send({ error_message: "Server error" });
    if (!userId) return res.status(401).send({ error_message: "Unauthorized" });
    
    // Check if already favorited
    Favorites.checkFavorite(userId, req.body.foodId, (err, exists) => {
      if (err) return res.status(500).send({ error_message: "Server error" });
      
      if (exists) {
        return res.status(400).send({ error_message: "Food already in favorites" });
      }
      
      // Add to favorites
      const favorite = {
        userId: userId,
        foodId: req.body.foodId,
        notes: req.body.notes
      };
      
      Favorites.addFavorite(favorite, (err, result) => {
        if (err) return res.status(500).send({ error_message: "Failed to add favorite" });
        return res.status(201).send(result);
      });
    });
  });
};

/**
 * Get all favorites for the logged-in user
 */
const getFavorites = (req, res) => {
  const token = req.get("Authorization");
  Users.getId(token, (err, userId) => {
    if (err) return res.status(500).send({ error_message: "Server error" });
    if (!userId) return res.status(401).send({ error_message: "Unauthorized" });
    
    Favorites.getFavoritesByUser(userId, (err, favorites) => {
      if (err) return res.status(500).send({ error_message: "Failed to retrieve favorites" });
      return res.status(200).send(favorites);
    });
  });
};

/**
 * Remove a food from user's favorites
 */
const removeFavorite = (req, res) => {
  const foodId = req.params.foodId;
  if (!foodId) {
    return res.status(400).send({ error_message: "Food ID is required" });
  }
  
  const token = req.get("Authorization");
  Users.getId(token, (err, userId) => {
    if (err) return res.status(500).send({ error_message: "Server error" });
    if (!userId) return res.status(401).send({ error_message: "Unauthorized" });
    
    Favorites.removeFavorite(userId, foodId, (err, success) => {
      if (err) return res.status(500).send({ error_message: "Failed to remove favorite" });
      
      if (!success) {
        return res.status(404).send({ error_message: "Favorite not found" });
      }
      
      return res.status(200).send({ message: "Favorite removed successfully" });
    });
  });
};

/**
 * Update notes for a favorite food
 */
const updateFavoriteNotes = (req, res) => {
  const foodId = req.params.foodId;
  if (!foodId) {
    return res.status(400).send({ error_message: "Food ID is required" });
  }
  
  // Validate request body
  const schema = Joi.object({
    notes: Joi.string().allow('', null).required()
  });
  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({ error_message: error.details[0].message });
  }
  
  const token = req.get("Authorization");
  Users.getId(token, (err, userId) => {
    if (err) return res.status(500).send({ error_message: "Server error" });
    if (!userId) return res.status(401).send({ error_message: "Unauthorized" });
    
    Favorites.updateFavoriteNotes(userId, foodId, req.body.notes, (err, success) => {
      if (err) return res.status(500).send({ error_message: "Failed to update favorite notes" });
      
      if (!success) {
        return res.status(404).send({ error_message: "Favorite not found" });
      }
      
      return res.status(200).send({ message: "Favorite notes updated successfully" });
    });
  });
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
  updateFavoriteNotes
}; 
