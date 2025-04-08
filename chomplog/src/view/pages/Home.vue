<template>
  <!-- coded by @Maryam Nizam Ismail edited by James-->
  <div class="content">
    <header>
      <h1 class="title">Chomplog</h1>
      <p class="subtitle">Track your calories with ease and stay healthy!</p>
    </header>


    <div class="image-container">
      <img src="../../assests/food.jpg" alt="Food Image" class="hero-image">
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
          ChompLog is the go-to platform for individuals seeking to monitor and manage their calorie consumption
          effectively.
          Our user-friendly interface and detailed explanations make it easy for anyone to start their calorie tracking
          journey.
        </p>
        <p class="section-text">
          We are dedicated solely to helping individuals achieve their health and fitness goals through calorie
          tracking.
          With a focus on simplicity and accuracy, ChompLog ensures that users have the tools they need to make informed
          choices about their nutrition.
        </p>
        <button @click="learnMore" class="btn">Learn More</button>
      </div>
    </main>
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
/* Main Content */
.content {
  text-align: center;

  background: rgb(255, 255, 255);
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
  max-width: 300vw;
  width: 50vw;
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