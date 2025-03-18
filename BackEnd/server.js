require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const request = require('request');


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


// backend serves
require('./Group11-main/Routes/User.Routes')(app);



// James did some changed on API route code
// Calories API route
app.get('/api/calories', (req, res) => {
  var query = req.query.food;
  request.get({
    url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
    headers: {
      'X-Api-Key': 'JuzyUZgjvxTnJ4klssfBRg==xBNZNLRgpRoKTThm'
    },
  }, function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    else {console.log(body)
    return body
    }

  });
  
});

// // Calories API route
// app.get('/api/calories', async (req, res) => {
//   try {
//     const query = req.query.food;
//     console.log(query)
//     const response = await axios.get('https://api.calorieninjas.com/v1/nutrition', {
//       params: { query },
//       headers: {
//         'X-Api-Key': process.env.CALORIE_NINJA_API_KEY
//       }
//     });
    
//     res.json(response.data);
//   } catch (error) {
//     // console.log(error)
//     res.status(500).json({ error: 'Failed to fetch calorie information' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
