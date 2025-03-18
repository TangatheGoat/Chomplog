const database = require("../../database");

/**
 * Add a favorite food for a user
 * @param {Object} favorite - The favorite object containing userId, foodId and optional notes
 * @param {Function} done - Callback function
 */
const addFavorite = (favorite, done) => {
  const query = "INSERT INTO favorites (user_id, food_id, notes) VALUES (?, ?, ?)";
  const values = [favorite.userId, favorite.foodId, favorite.notes || null];

  database.run(query, values, function (err) {
    if (err) {
      return done(err);
    }
    return done(null, {
      id: this.lastID,
      userId: favorite.userId,
      foodId: favorite.foodId,
      notes: favorite.notes || null
    });
  });
};

/**
 * Get all favorites for a specific user
 * @param {number} userId - The user ID
 * @param {Function} done - Callback function
 */
const getFavoritesByUser = (userId, done) => {
  const query = "SELECT * FROM favorites WHERE user_id = ?";
  
  database.all(query, [userId], (err, rows) => {
    if (err) {
      return done(err);
    }
    return done(null, rows);
  });
};

/**
 * Check if a food is already favorited by a user
 * @param {number} userId - The user ID
 * @param {number} foodId - The food ID
 * @param {Function} done - Callback function
 */
const checkFavorite = (userId, foodId, done) => {
  const query = "SELECT * FROM favorites WHERE user_id = ? AND food_id = ?";
  
  database.get(query, [userId, foodId], (err, row) => {
    if (err) {
      return done(err);
    }
    return done(null, row ? true : false);
  });
};

/**
 * Remove a favorite food for a user
 * @param {number} userId - The user ID
 * @param {number} foodId - The food ID
 * @param {Function} done - Callback function
 */
const removeFavorite = (userId, foodId, done) => {
  const query = "DELETE FROM favorites WHERE user_id = ? AND food_id = ?";
  
  database.run(query, [userId, foodId], function (err) {
    if (err) {
      return done(err);
    }
    return done(null, this.changes > 0);
  });
};

/**
 * Update notes for a favorite food
 * @param {number} userId - The user ID
 * @param {number} foodId - The food ID
 * @param {string} notes - The updated notes
 * @param {Function} done - Callback function
 */
const updateFavoriteNotes = (userId, foodId, notes, done) => {
  const query = "UPDATE favorites SET notes = ? WHERE user_id = ? AND food_id = ?";
  
  database.run(query, [notes, userId, foodId], function (err) {
    if (err) {
      return done(err);
    }
    return done(null, this.changes > 0);
  });
};

module.exports = {
  addFavorite,
  getFavoritesByUser,
  checkFavorite,
  removeFavorite,
  updateFavoriteNotes
}; 
