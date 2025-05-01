//@TangatheGoat
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
// server port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// backend routes
require('./Group11-main/Routes/User.Routes')(app);
require('./Group11-main/Routes/Favorites.Routes')(app);
require('./Group11-main/Routes/Foods.Routes')(app);

// Updated to use FoodData Central API with API key included
app.get('/api/calories', async (req, res) => {
  try {
    const query = req.query.food;
    
    // FDC API key directly in code
    const apiKey = '9fTAJYy9Kgxo5mWakFIgq3eLHjAIpW2LZ99rYUeI';

    // Making a request to FoodData Central API
    const response = await axios.get('https://api.nal.usda.gov/fdc/v1/foods/search', {
      params: {
        query: query,
        pageSize: 5, // Limit results to 5 items
        api_key: apiKey
      }
    });
    
    // Process the response to make it similar to your previous API format
    const foods = response.data.foods.map(food => {
      // Find nutrients (calories, protein, fat, carbs)
      const calories = food.foodNutrients.find(n => n.nutrientName === 'Energy' || n.nutrientNumber === '208')?.value || 0;
      const protein = food.foodNutrients.find(n => n.nutrientName === 'Protein' || n.nutrientNumber === '203')?.value || 0;
      const fat = food.foodNutrients.find(n => n.nutrientName === 'Total lipid (fat)' || n.nutrientNumber === '204')?.value || 0;
      const carbs = food.foodNutrients.find(n => n.nutrientName === 'Carbohydrate, by difference' || n.nutrientNumber === '205')?.value || 0;
      
      return {
        name: food.description,
        calories: calories,
        serving_size_g: 100, // FDC typically uses 100g as the reference amount
        protein_g: protein,
        fat_total_g: fat,
        carbohydrates_total_g: carbs,
        fdcId: food.fdcId,
        foodCategory: food.foodCategory || ''
      };
    });
    
    res.json(foods);
  } catch (error) {
    console.error('Error fetching from FDC API:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch nutrition information',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
