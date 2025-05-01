//@TangatheGoat
const database = require("../../database");
const Joi = require('joi');

/**
 * Get a food by its ID
 * @param {number} foodId - The food ID
 * @param {Function} done - Callback function
 */
const getFoodById = (foodId, done) => {
  const query = `
    SELECT f.*, fn.protein, fn.carbohydrates, fn.fat, fn.fiber, fn.sugar
    FROM foods f
    LEFT JOIN food_nutrients fn ON f.id = fn.food_id
    WHERE f.id = ?
  `;
  
  database.get(query, [foodId], (err, row) => {
    if (err) {
      return done(err);
    }
    return done(null, row);
  });
};

/**
 * Search foods in the database
 * @param {string} searchTerm - The search term
 * @param {number} limit - Maximum number of results
 * @param {number} offset - Number of results to skip 
 * @param {Function} done - Callback function
 */
const searchFoods = (searchTerm, limit = 20, offset = 0, done) => {
  const query = `
    SELECT f.*, fn.protein, fn.carbohydrates, fn.fat, fn.fiber, fn.sugar
    FROM foods f
    LEFT JOIN food_nutrients fn ON f.id = fn.food_id
    WHERE f.name LIKE ?
    ORDER BY f.name
    LIMIT ? OFFSET ?
  `;
  
  const searchParam = `%${searchTerm}%`;
  
  database.all(query, [searchParam, limit, offset], (err, rows) => {
    if (err) {
      return done(err);
    }
    return done(null, rows);
  });
};

/**
 * Save food from API to database
 * @param {Object} foodData - Food data from API
 * @param {Function} done - Callback function
 */
const saveFoodFromApi = (foodData, done) => {
  // Add date handling
  const publicationDate = foodData.publicationDate ? new Date(foodData.publicationDate) : null;
  const availableDate = foodData.availableDate ? new Date(foodData.availableDate) : null;
  
  const query = `
    INSERT INTO foods (
      name, calories, serving_size, api_id, created_at, 
      publication_date, data_type
    )
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?)
  `;
  
  // Extract nutrient values
  const getNutrientValue = (nutrients, name, nutrientNumber) => {
    return nutrients.find(n => 
      n.nutrientName === name || n.nutrientNumber === nutrientNumber
    )?.value || 0;
  };
  
  const calories = getNutrientValue(foodData.foodNutrients, 'Energy', null);
  
  const values = [
    foodData.description,
    calories,
    foodData.servingSize ? `${foodData.servingSize} ${foodData.servingSizeUnit}` : 'default serving',
    foodData.fdcId,
    publicationDate,
    foodData.dataType
  ];
  
  database.run(query, values, function(err) {
    if (err) return done(err);
    
    const foodId = this.lastID;
    
    // Save nutrients
    const nutrientsQuery = `
      INSERT INTO food_nutrients (food_id, protein, carbohydrates, fat, fiber, sugar)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const nutrientValues = [
      foodId,
      getNutrientValue(foodData.foodNutrients, 'Protein', null),
      getNutrientValue(foodData.foodNutrients, 'Carbohydrate', null),
      getNutrientValue(foodData.foodNutrients, 'Total lipid (fat)', null),
      getNutrientValue(foodData.foodNutrients, 'Fiber', null),
      getNutrientValue(foodData.foodNutrients, 'Sugars', null)
    ];
    
    database.run(nutrientsQuery, nutrientValues, (err) => {
      if (err) return done(err);
      
      done(null, { 
        id: foodId,
        name: foodData.description,
        calories: calories,
        api_id: foodData.fdcId 
      });
    });
  });
};

/**
 * Check if a food with this API ID already exists in database
 * @param {string} apiId - The API ID of the food
 * @param {Function} done - Callback function
 */
const checkFoodExists = (apiId, done) => {
  const query = "SELECT id FROM foods WHERE api_id = ?";
  
  database.get(query, [apiId], (err, row) => {
    if (err) {
      return done(err);
    }
    return done(null, row ? row.id : null);
  });
};

const validateFoodData = (foodData) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    fdcId: Joi.string().required(),
    dataType: Joi.string(),
    servingSize: Joi.number(),
    servingSizeUnit: Joi.string(),
    foodNutrients: Joi.array().required()
  });
  return schema.validate(foodData);
};

module.exports = {
  getFoodById,
  searchFoods,
  saveFoodFromApi,
  checkFoodExists,
  validateFoodData
}; 
