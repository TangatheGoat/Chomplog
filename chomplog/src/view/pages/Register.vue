<!--auther @luke  -->
<template>
  <div class="app-container">
    <!-- Introduction --> 
     
    <div class="web-intro">
      <p>"Chomplog your own calorie tracker"</p>
    </div>

    <!-- Registration Section -->
    <div class="RegForm">
      <form @submit.prevent="submitForm">
        <!-- Username -->
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" class="form-control" required />

        <!-- Email -->
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" class="form-control" required />

        <!-- Gender -->
        <label for="gender">Gender:</label>
        <select id="gender" v-model="gender" class="form-control" required>
          <option value="">--Select Gender--</option>
          <option value="male">Male</option>s
          <option value="female">Female</option>
        </select>

        <!-- Password -->
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" required />

        <!-- Confirm Password -->
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required />

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import { UserService } from '../../services/User.service';
export default {
  data() {
    return {
      username: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    submitForm(e) {
        const {username,email,gender ,password} = this
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      UserService.RegisterUser(this.username,this.email,this.gender,this.password)
      .then((response)=>{
        if(response&& response.error_message)
        this.error= response.error_message
        if(!error){
        this.$router.push("/login")}
    }
)
      .catch(error=> this.error=error)
    }
  }
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

/* Header Intro */
.web-intro {
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: #3D5315;
  margin-top: 1rem;
}

/* Registration Form */
.RegForm {
  background: white;
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #3D5315;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background-color: #2C3E15;
}
</style>

  
  