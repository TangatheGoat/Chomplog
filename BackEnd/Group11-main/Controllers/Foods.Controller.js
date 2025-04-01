const axios = require('axios');
const Foods = require('../Models/Foods.Models');
const Joi = require('joi');

// USDA FoodData Central API configuration
const USDA_API_KEY = process.env.USDA_API_KEY || '9fTAJYy9Kgxo5mWakFIgq3eLHjAIpW2LZ99rYUeI';
const USDA_API_URL = 'https://api.nal.usda.gov/fdc/v1';

/**
 * Search foods from USDA API
 */
const searchFoodsFromApi = async (req, res) => {
  try {
    const { 
      query, 
      pageSize = 25, 
      pageNumber = 1,
      dataType = null,  // Add support for dataType parameter
      sortBy = null,    // Add support for sortOrder and sortDirection
      sortOrder = null,
      brandOwner = null // Add support for brandOwner filter
    } = req.query;
    
    const params = {
      api_key: USDA_API_KEY,
      query,
      pageSize,
      pageNumber
    };
    
    // Add optional parameters if provided
    if (dataType) params.dataType = dataType;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;
    if (brandOwner) params.brandOwner = brandOwner;
    
    const response = await axios.get(`${USDA_API_URL}/foods/search`, { params });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error searching foods:', error.message);
    
    // Handle specific API error responses
    if (error.response) {
      const status = error.response.status;
      if (status === 400) {
        return res.status(400).json({ error: 'Bad request - invalid parameters' });
      } else if (status === 401) {
        return res.status(401).json({ error: 'Unauthorized - invalid API key' });
      } else if (status === 404) {
        return res.status(404).json({ error: 'Food not found' });
      }
    }
    
    res.status(500).json({ error: 'Failed to search foods' });
  }
};

/**
 * Get food details from USDA API
 */
const getFoodDetailsFromApi = async (req, res) => {
  try {
    const { fdcId } = req.params;
    const { format = 'full', nutrients } = req.query; // Support format and nutrients parameters
    
    if (!fdcId) {
      return res.status(400).json({ error: 'Food ID is required' });
    }
    
    const params = {
      api_key: USDA_API_KEY
    };
    
    if (format) params.format = format;
    if (nutrients) params.nutrients = nutrients;
    
    const response = await axios.get(`${USDA_API_URL}/food/${fdcId}`, { params });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error getting food details:', error.message);
    res.status(500).json({ error: 'Failed to get food details' });
  }
};

/**
 * Save food from USDA API to database
 */
const saveFoodFromApi = async (req, res) => {
  try {
    const { fdcId } = req.body;
    
    if (!fdcId) {
      return res.status(400).json({ error: 'Food ID is required' });
    }
    
    // Check if food already exists in database
    Foods.checkFoodExists(fdcId, async (err, existingFoodId) => {
      if (err) {
        console.error('Error checking food existence:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (existingFoodId) {
        // Food already exists, return it
        Foods.getFoodById(existingFoodId, (err, food) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to retrieve food' });
          }
          return res.status(200).json(food);
        });
      } else {
        // Food doesn't exist, fetch from API and save
        try {
          const response = await axios.get(`${USDA_API_URL}/food/${fdcId}`, {
            params: {
              api_key: USDA_API_KEY
            }
          });
          
          const foodData = response.data;
          
          Foods.saveFoodFromApi(foodData, (err, result) => {
            if (err) {
              console.error('Error saving food:', err);
              return res.status(500).json({ error: 'Failed to save food' });
            }
            
            res.status(201).json(result);
          });
        } catch (apiError) {
          console.error('API error:', apiError.message);
          res.status(500).json({ error: 'Failed to fetch food from API' });
        }
      }
    });
  } catch (error) {
    console.error('Error in save food flow:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Search foods in database
 */
const searchFoodsInDb = (req, res) => {
  const { query, limit = 20, page = 1 } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const offset = (page - 1) * limit;
  
  Foods.searchFoods(query, parseInt(limit), offset, (err, foods) => {
    if (err) {
      console.error('Error searching foods in DB:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json({ foods, page: parseInt(page), limit: parseInt(limit) });
  });
};

/**
 * Get food details from database
 */
const getFoodFromDb = (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'Food ID is required' });
  }
  
  Foods.getFoodById(id, (err, food) => {
    if (err) {
      console.error('Error getting food from DB:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    
    res.json(food);
  });
};

/**
 * Get calories for a specific food
 */
const getCalories = async (req, res) => {
  try {
    const { food } = req.query;
    
    if (!food) {
      return res.status(400).json({ error: 'Food query is required' });
    }
    
    // Search for the food in USDA database
    const response = await axios.get(`${USDA_API_URL}/foods/search`, {
      params: {
        api_key: USDA_API_KEY,
        query: food,
        pageSize: 1
      }
    });
    
    if (!response.data.foods || response.data.foods.length === 0) {
      return res.status(404).json({ error: 'Food not found' });
    }
    
    const foodItem = response.data.foods[0];
    
    // Format the response to match what your front-end expects
    const nutrientData = {
      name: foodItem.description,
      calories: foodItem.foodNutrients.find(n => n.nutrientName === 'Energy')?.value || 0,
      serving_size: foodItem.servingSize ? `${foodItem.servingSize} ${foodItem.servingSizeUnit}` : 'default serving',
      protein: foodItem.foodNutrients.find(n => n.nutrientName.includes('Protein'))?.value || 0,
      fat: foodItem.foodNutrients.find(n => n.nutrientName.includes('Total lipid (fat)'))?.value || 0,
      carbohydrates: foodItem.foodNutrients.find(n => n.nutrientName.includes('Carbohydrate'))?.value || 0,
      fiber: foodItem.foodNutrients.find(n => n.nutrientName.includes('Fiber'))?.value || 0,
      sugar: foodItem.foodNutrients.find(n => n.nutrientName.includes('Sugars'))?.value || 0,
      fdcId: foodItem.fdcId
    };
    
    res.json([nutrientData]); // Wrap in array to match current API response format
  } catch (error) {
    console.error('Error fetching calories:', error.message);
    res.status(500).json({ error: 'Failed to fetch calorie information' });
  }
};

module.exports = {
  searchFoodsFromApi,
  getFoodDetailsFromApi,
  saveFoodFromApi,
  searchFoodsInDb,
  getFoodFromDb,
  getCalories
}; 
