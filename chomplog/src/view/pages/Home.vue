<template>
  <!-- coded by @Maryam -->
  <div class="content">
    <header>
      <h1 class="title">Chomplog</h1>
      <p class="subtitle">Track your calories with ease and stay healthy!</p>
    </header>


    <div class="image-container">
      <img src="../../assests/background.png" alt="Food Image" class="hero-image">
    </div>

    <main>
      <!-- Welcome Section -->
      <div class="section">
        <h2 class="section-title">Welcome to Chomplog</h2>
        <p class="section-text">Your personal calorie tracker for a healthier lifestyle.</p>
        <button @click="$router.push('/login')" class="btn">Start Logging</button>
      </div>

      <!-- About Section -->
      <div class="about-section">
        <h2 class="section-title">About Chomplog</h2>
        <p class="section-text">
          ChompLog is the go-to platform for individuals seeking to monitor and manage their calorie consumption effectively.
          Our user-friendly interface and detailed explanations make it easy for anyone to start their calorie tracking journey.
        </p>
        <p class="section-text">
          We are dedicated solely to helping individuals achieve their health and fitness goals through calorie tracking.
          With a focus on simplicity and accuracy, ChompLog ensures that users have the tools they need to make informed choices about their nutrition.
        </p>
        <button @click="learnMore" class="btn">Learn More</button>
      </div>
    </main>
  </div>

  <!-- NHS Links -->
  <div class="NHS-links">
    <a href="https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/" class="nhs-info-link">Balanced Diet</a>
    <a href="https://www.nhs.uk/better-health/lose-weight/calorie-counting/" class="nhs-info-link">Understanding Calories</a>
    <a href="https://www.nhsinform.scot/healthy-living/food-and-nutrition/healthy-eating-and-weight-management/tips-on-how-to-maintain-a-healthy-weight/" class="nhs-info-link">Weight Maintenance</a>
  </div>
  </template>
  <script>
  export default {
    name: "HomePage",
    data() {
      return {
        showMenu: false
      };
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      learnMore() {
        window.open('https://www.healthline.com/nutrition/calorie-counting-101', '_blank');
      }
    }
  };
  </script>
   
  <style scoped>
  /* Global Styling */
  .container {
    background-color: #e8f5e9;
   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
   
  /* Header */
  .web-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2e7d32;
    padding: 15px 20px;
    color: white;
  }
   
  .web-logo {
    display: flex;
    align-items: center;
  }
   
  .web-logo img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
   
  .web-logo h1 {
    font-size: 24px;
  }
   
  .menu {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
  }
   
  .nav {
    display: none;
  }
   
  .nav-open {
    display: block;
  }
   
  .nav ul {
    list-style: none;
    display: flex;
    gap: 15px;
  }
   
  .nav a {
    color: white;
    text-decoration: none;
  }
   
  /* Intro */
  .web-intro {
    text-align: center;
    font-size: 18px;
    color: #388e3c;
    margin: 20px 0;
  }
   
  /* Main Content */
  .content {
    text-align: center;
    
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
   
  .title {
    font-size: 36px;
    color: #2e7d32;
    font-weight: bold;
  }
   
  .subtitle {
    font-size: 18px;
    color: #388e3c;
    margin-top: 10px;
  }
   
  .image-container {
    margin: 20px 0;
  }
   
  .hero-image {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
   
  /* Sections */
  .section,
  .about-section {
    background: #f1f8e9;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
  }
   
  .section-title {
    font-size: 24px;
    color: #2e7d32;
    font-weight: bold;
  }
   
  .section-text {
    font-size: 16px;
    color: #388e3c;
    margin-top: 10px;
  }
   
  .btn {
    background-color: #43a047;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 15px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }
   
  .btn:hover {
    background-color: #388e3c;
  }
   
  /* NHS Links */
  .NHS-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
  }
   
  .nhs-info-link {
    text-decoration: none;
    color: #2e7d32;
    font-weight: bold;
  }
   
  /* Footer */
  .web-footer {
    width: 100%;
    background-color: #2e7d32;
    color: white;
    text-align: center;
    padding: 20px;
  }
   
  .web-footer-content {
    display: flex;
    justify-content: center;
    gap: 40px;
  }
   
  .web-footer-section h3 {
    margin-bottom: 5px;
  }
  </style>