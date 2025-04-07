// All the code in this Login page was done by Mohammed-Huzayl Anwar
// scripts ipdated by james.
// page impmentaded by james.

<template>
  <div class="app-container">
    <!-- Introduction -->
    <div class="web-intro">
      <p>"Chomplog your own calorie tracker"</p>
    </div>

    <!-- Login Section -->
    <div class="login-box">
      <h2>Login</h2>
      <p class="login-text">Log in to track your calories and manage your health!</p>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
      Dont have an account? <router-link to="/register">Register</router-link>
    </p>
    </div>
    <p>
     
    </p>
  </div>
</template>

<script> 
import { UserService } from '../../services/User.service';

export default {
  data() {
    return {
      email: '',
      password: '',
      passwordError: '',
      showMenu: false,
    };
  },
  methods: {
    handleLogin() {
      const {email , password} = this
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[%^&*()\-+!]).{4,20}$/;
      if (!passwordRegex.test(this.password)) {
        this.passwordError = "Password must be 4-20 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
        return;
      }
      UserService.login(email,password)
      .then(results=>{
        if (results){
          console.log('Logging in with:', email, password);
          window.location.reload()
        }

      })
      .catch(passwordError => this.passwordError = passwordError);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style scoped>
/* General Styles */
body {
  background-color: #e9f5e9;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Header */
.web-header {
  background-color: #3D5315;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.web-logo {
  display: flex;
  align-items: center;
}

.web-logo img {
  height: 50px;
  margin-right: 10px;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.nav a:hover {
  text-decoration: underline;
}

.menu {
  display: none;
}

/* Intro */
.web-intro {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #3D5315;
  margin-top: 1rem;
}

/* Login Box */
.login-box {
  background: white;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-text {
  color: #3D5315;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  color: #333;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #3D5315;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #2C3E15;
}

/* NHS Links */
.NHS-links {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px;
}

.nhs-info-link {
  text-decoration: none;
  color: #3D5315;
  font-weight: bold;
  border: 1px solid #3D5315;
  padding: 10px;
  border-radius: 5px;
  transition: 0.3s;
}

.nhs-info-link:hover {
  background-color: #3D5315;
  color: white;
}

/* Footer */
.web-footer {
  background-color: #3D5315;
  color: white;
  padding: 20px;
  text-align: center;
}

.web-footer-content {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.web-footer-section {
  font-size: 0.9rem;
}
</style>
