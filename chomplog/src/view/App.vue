<meta name="viewport" content="width=device-width, initial-scale=1.0">
</meta>
<template>
  <header class="web-header">
<div class="web-logo">
<img src="../assests/logo.png" alt="Chomplog Logo">
<h1>Chomplog</h1>
</div>

<button class="menu" @click="toggleMenu">
  &#9776;
</button>
<nav class="nav" :class="{ 'nav-open': showMenu }">
<ul>
  <li><RouterLink to="/">Home</RouterLink></li>
  <li><RouterLink to="/login">login</RouterLink></li>
  <li><RouterLink to ="/register">register</RouterLink></li>
</ul>
</nav>
</header>
<RouterView/>

  <div class="NHS-links">
    <a href="https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/" class="nhs-info-link">Balance diet</a>
<a href="https://www.nhs.uk/better-health/lose-weight/calorie-counting/"class="nhs-info-link">  Understanding Calories</a>  
<a href="https://www.nhsinform.scot/healthy-living/food-and-nutrition/healthy-eating-and-weight-management/tips-on-how-to-maintain-a-healthy-weight/"class="nhs-info-link">Weight maintainance </a>  
</div>
<footer class="web-footer">
  <div class="web-footer-copyright">
      <p>&copy; 2025 Chomplog All rights reserved.</p>
    </div>
    <div class="web-footer-content">
      <div class="web-footer-section">
        <h3>Address</h3>
        <p>1 paradise Street</p>
        <p>planet,Mars, M12 5RE </p>
      </div>
      <div class="web-footer-section">
        <h3>Contact us</h3>
        <p>+44654257788</p>
        <p>help@Chomplog.com</p>
      </div>
    </div>
   
  </footer>

</template>

<script>
import { RouterLink } from 'vue-router';
export default {
  name: 'Header',
  data(){
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu(){
      this.showMenu = !this.showMenu;
    }
  }
  }
  </script>
  
  <style scoped>
  .web-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    font-size: 0.8rem;
    color: white;
    background-color: #3D5315;
  }
  .web-logo {
    display: flex;
    align-items: center;
  }
  .web-logo img {
    border: #82a73d;
    border-radius: 20%;
    width: 60px;
    height: 60px;
    margin-right: 0.5rem;
  padding-left: 1.25%;
  }

  .nav {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 10%;
  }
  .nav ul{
    font-size: large;
    list-style: none;
    display: flex;
    gap: 6rem;
    margin: 0;
    padding: 0;
  }

  .nav a {
  color: white;
  text-decoration: none;
  font-weight : bold;
  }
  .nav a:hover{
  text-decoration: underline;
  }
  .menu{
    display: none;
  font-size: 1.5rem;
  background: none;
  cursor: pointer;
  color: white;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1001;
  }
 
.web-intro {
  color: #3D5315;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
padding-left: 0.75%

}
  .background-image {
  position: relative;
  margin-top: 1rem;
  text-align: center;
  height: 50vh;
  align-items: center;
  }
  .background-image img {
    width: 100%;
    height: 100%;
  }
  .input-circle {
   width: 13rem;
    height: 13rem;
    background-color: white;
    border: 3px solid #3D5315 ;
    border-radius: 50rem;
    display: flex;
    position: absolute;
    top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
 
    
  }
  
  .NHS-links {
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
    font-size: 1.3rem;
    padding: 0.4rem;
  }
  .nhs-info-link:hover {
    background-color: #3D5315;
    color: white;
  }
  .web-footer {
  background-color: #3D5315; 
  color: white; 
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 5rem;
  padding-right: 5rem;
  }
.web-footer-content {
  display: flex;
  justify-content: space-between;
}


.web-footer-copyright {
  text-align: center;
  font-size: 1rem;
}
  .web-footer-section{
    font-size:0.8rem;
  }
  @media (max-width: 768px) {
    .web-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    font-size: 0.8rem;
    color: white;
    background-color: #3D5315;
  }
    .web-header {
      position: relative;
      justify-content: space-between;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-size: 0.5rem;
      padding: 0.5rem;
    }
  .menu{
  border-color: white;
    display: block;
    top: 0.9rem;
    right: 0.4rem;
    z-index: 1;
  
  }
 
  .nav {
      display: none;
      flex-direction: column;
      width: auto;
      text-align: right;
      font-size: 1rem;
      position: absolute;
      background-color: #3D5315;
      top: 4.1rem;
      right: 0rem;
      left: 15rem;
      z-index: 1000;
     padding: 1rem;
     border-radius: 5px;
    
      
    }
  .nav.nav-open{
    display: flex;  
  }
    .nav ul {
      flex-direction: column;
      gap: 1rem;
     padding: 0;
     padding: 0;
    }
   .nav ul li {
    border: 1px solid white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
      }
    .web-intro {
      font-size: 1.2rem;
    }
    .background-image {
  position: relative;
  margin-top: 1rem;
  text-align: center;
  height: 40vh;
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
    .input-circle {
      width: 220px;
      height: 220px;
      font-size: 1rem;
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
  .NHS-links{
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
  .nhs-info-link{
    width: 30%;
    text-align: center;
  }

.web-footer {
  background-color: #3D5315; 
  color: white; 
  padding: 1rem;
  text-align: center;
  margin-top: 1rem; 
  }
.web-footer-copyright {
  width: 100%;
  text-align: center;
  margin-top: 0.7rem;
}


.web-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
}
.web-footer p {
  margin: 0; 
  font-size: 0.7rem;
}

  .web-footer-section{
    font-size: 0.5rem;

  }
  }
  
  @media (max-width: 480px) {
    .web-header {
      flex-direction: column;
      align-items: center;
      font-size: x-small;
    }
  
    .nav {
      justify-content: center;
      padding-right: 0;
    }
  
    .nav ul {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
      font-size: medium;
    }
    .menu{
    display: block;
  }
    .web-intro {
      margin-top: -0.30rem;
      font-size: 1rem;
    }
  

    .web-logo {
    display: flex;
    align-items: center;
  }
  .web-logo img {
    border: #82a73d;
    border-radius: 20%;
    width: 35px;
    height: 35px;
    margin-right: 0.5rem;
    padding-left: 1.25%;
  }
    .input-circle {
      width: 220px;
      height: 220px;
      font-size: 0.8rem;

    }
    .background-image {
  position: relative;
  margin-top: 1rem;
  text-align: center;
  height: 40vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .background-image img {
    width: 100%;
    height: 100%;
  
  }

    .nhs-info-link{
      font-size: 1rem;
    }

.web-footer {
  background-color: #3D5315; 
  color: white; 
  padding: 1rem;
  text-align: center;
  margin-top: 0.75rem; 
  }
.web-footer-copyright {
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
}


.web-footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
}
.web-footer p {
  margin: 0;
  font-size: 0.5rem;
}

  .web-footer-section{
    font-size: 0.3rem;
  }
  }
  
 
  
  </style>