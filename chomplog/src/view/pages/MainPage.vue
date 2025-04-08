<template>
    <div class="main-content">
<div class="web-intro">
    <p>"Chomplog your own calorie tracker"</p>
  </div>
  
  <div class="background-image">
    <img src="../../assests/background.png" alt=" Image">
    
    <div class="input-circle">
  
  <div class="input-form">
      <input type="text" v-model="foodItem" placeholder="Enter food item" class="food-input" />
      <input type="number" v-model="weight" placeholder="Enter weight (grams)" class="weight-input" />
      <button class="submit-button" @click="fetchCalories">Submit</button>
    </div>
    
    <div v-if="calorieData" class="calorie-result">
      
      <p>{{ calorieData }}</p>
 
      <button class="add-button" @click="addToLog" v-if="calculatedCalories && calculatedCalories > 0">Add </button>
      <button class="delete-button" @click="deleteInitialEntry" v-if="calculatedCalories && calculatedCalories > 0">Delete</button>
    </div>
    
    <div class="calorie-log" v-if="calorieLog.length > 0">
      <div class="log-total">
        <strong>Total Calories {{ totalCalories.toFixed(2) }} kcal</strong>
      </div>  
    </div>
  </div>
 </div>
    <div class="NHS-links">
      <a href="https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/" class="nhs-info-link">Balance diet</a>
  <a href="https://www.nhs.uk/better-health/lose-weight/calorie-counting/"class="nhs-info-link">  Understanding Calories</a>  
  <a href="https://www.nhsinform.scot/healthy-living/food-and-nutrition/healthy-eating-and-weight-management/tips-on-how-to-maintain-a-healthy-weight/"class="nhs-info-link">Weight maintainance </a>  
  </div></div>
 </template>
 <script>
 export default {
   name: 'MainPage',
   data() {
     return {
       foodItem: '',
       weight: '',
       calorieData: null,
       calculatedCalories: 0,
       calorieLog: [],
       lastUpdatedDate: new Date().toLocaleDateString()
       
     };
   },
   computed: {
     totalCalories() {
       return this.calorieLog.reduce((total, entry) => total + entry.calories, 0);
     }
   },
   methods: {
    checkIfDayChanged() {
    const currentDate = new Date().toLocaleDateString();
    if (this.lastUpdatedDate !== currentDate) {
      this.calorieLog = [];
      this.lastUpdatedDate = currentDate;
    }
  },
     async fetchCalories() {
      this.checkIfDayChanged(); 
       if (!this.foodItem.trim()) {
         alert('Please enter a food item.');
         return;
       }
 
       if (!this.weight || this.weight <= 0) {
         alert('Please enter a valid weight in grams.');
         return;
       }
 
       try {
         const apiKey = '55BMfZgNZq46yR7MMXHgeLQ7umw3hiE2ZvSTC7wq';
         const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${this.foodItem}&api_key=${apiKey}`;
 
         const response = await fetch(apiUrl);
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
 
         const data = await response.json();
         console.log(data);
 
         if (data.foods && data.foods.length > 0) {
           const food = data.foods[0];
           const calorieInfo = food.foodNutrients?.find(
             (nutrient) => nutrient.nutrientName === 'Energy'
           );
 
           if (calorieInfo) {
             this.calculatedCalories = (calorieInfo.value * this.weight) / 100;
             this.calorieData = `${this.foodItem} has ${this.calculatedCalories.toFixed(2)} kcal / ${this.weight}g.`;
           } else {
             this.calorieData = 'Calorie information not found for this food item.';
             this.calculatedCalories = null;
           }
         } else {
           this.calorieData = 'No calorie information found for this food item.';
         }
       } catch (error) {
         console.error('Error fetching calorie data:', error);
         this.calorieData = 'An error occurred while fetching data.';
       }
     },
     addToLog() {
       if (this.calculatedCalories > 0) {
         this.calorieLog.push({
           food: this.foodItem,
           weight: this.weight,
           calories: this.calculatedCalories
         });
         
         this.foodItem = '';
         this.weight = '';
         this.calorieData = null;
         this.calculatedCalories = 0;
       }
     },
     deleteInitialEntry() {
  this.calorieData = null;
  this.calculatedCalories = 0;
}
   }
 };
 </script>
 
   <style scoped>
   

  @media screen {
    .web-intro {
    font-size: 1rem;
    color: #3D5315;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
padding-left: 0.75%
    }
    .background-image {
  position: relative;
  margin-top: 1rem;
  text-align: center;
  height: 80vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .background-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    
    .logo {
   margin-right: auto;
  }
  .web-logo img {
    border: #82a73d;
    border-radius: 20%;
    width: 30px;
    height: 30px;
    margin-right: 0.5rem;
    padding-left: 1.25%;
  }
  .input-circle {
   width: 30rem;
    height: 30rem;
    background-color: white;
    border: 3px solid #3D5315 ;
    border-radius: 50rem;
    display: flex;
    position: absolute;
    top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  justify-content: center;
  align-items: center;
  flex-direction: column;
    
  }
  .circle-content {
  text-align: center;
  color: #3D5315;
  font-weight: bold;
  font-size: 1.2rem;
}
  .input-form {
  position: absolute;
  top: 80%; 
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  justify-content: center;
  gap: 1rem;
}

.food-input,
.weight-input {
  width: 20rem;
 
  padding: 0.2rem;
  margin: 0.2rem 0rem;
  border: 1px solid #3D5315;
  border-radius: 5px;
  font-size: 1rem;

}
.submit-button {
  padding: 0.5rem 1rem;
  background-color: #3D5315;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover {

  text-decoration: underline white;

}
.add-button, .delete-button {
  padding: 0.5rem 1.2rem;
  font-size: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
  border: none;
  margin: 0.5rem 0;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-button {
  background-color: #4CAF50; 
  color: white;
}

.add-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.delete-button {
  background-color: #f44336; 
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
  transform: scale(1.05);
}
.calorie-result {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #3D5315;
}
.log-total {
text-align: center;
font-size:  0.7rem;
color: #3D5315;}
  .NHS-links{
    text-decoration: none;
    display: flex;
    justify-content: space-around;
    color: #3D5315;
    margin-top: 2.5rem;
    margin-bottom: 3rem;
  }
  .nhs-info-link{
   text-decoration: underline;
    color: #3D5315;
    font-size: 1rem;
    padding: 0.4rem;
    
  }
  
  .nhs-info-link:hover {
    background-color: #3D5315;
    color: white;
  }
  }
    
  @media (min-width: 360px) {
    .web-intro {
     
      color: #3D5315;
    }
 
    .background-image {
  position: relative;
  margin-top: 1rem;
  text-align: center;
  height: 50vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .background-image img {
    width: 100%;
    height: 100%;
  
  }}
  .input-circle {
   width: 10rem;
    height: 10rem;
    background-color: white;
    border: 3px solid #3D5315 ;
    border-radius: 50rem;
    display: flex;
    position: absolute;
    top: 30%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  justify-content: center;
  align-items: center;
  flex-direction: column;
    
  }
  .circle-content {
  text-align: center;
  color: #3D5315;
  font-weight: bold;
  font-size: 1.2rem;
}
  .input-form {
  position: absolute;
  top: 145%; 
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: space-between;
  justify-content: center;
  gap: 0.025rem;

}

.food-input,
.weight-input {
  width: 10rem;
 
  padding: 0.3rem;
  margin: 0.2rem;
  border: 1px solid #3D5315;
  border-radius: 5px;
  font-size: 0.8em;
 

}
.submit-button {
  padding: 0.25rem 0.5rem;
  margin: 0.2rem;
  background-color: #3D5315;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.submit-button:hover {

  text-decoration: underline white;

}


.add-button {
  background-color: #4CAF50; 
  color: white;
}

.add-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.delete-button {
  background-color: #f44336; 
  color: white;
}

.delete-button:hover {
  background-color: #e53935;
  transform: scale(1.05);
}

.nhs-info-link{
 
   text-decoration: underline;
    color: #3D5315;
    font-size: 1rem;
    padding: 0.4rem;
  }
  .nhs-info-link:hover {
    background-color: #3D5315;
    color: white;
  }

</style>