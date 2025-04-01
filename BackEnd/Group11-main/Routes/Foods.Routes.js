const Foods = require("../Controllers/Foods.Controller");
const auth = require("../../Lib/Middleware");
const Joi = require('joi');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

module.exports = function (app) {
  // USDA API search - make path more consistent with API schema
  app.route("/api/fdc/foods/search").get(apiLimiter, Foods.searchFoodsFromApi);
  
  // USDA API get food details - make path more consistent with API schema
  app.route("/api/fdc/food/:fdcId").get(Foods.getFoodDetailsFromApi);
  
  // Save food from API to database
  app.route("/api/foods").post(auth.loggedIn, Foods.saveFoodFromApi);
  
  // Search foods in database
  app.route("/api/db/foods").get(auth.loggedIn, Foods.searchFoodsInDb);
  
  // Get food details from database
  app.route("/api/db/foods/:id").get(Foods.getFoodFromDb);
  
  // Get calories for a food
  app.route("/api/calories").get(Foods.getCalories);
}; 
