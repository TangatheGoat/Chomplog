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
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink v-if="showLogin" to="/login">login</RouterLink>
          <RouterLink v-if="showMain" to="/MainPage">User Page</RouterLink>
        </li>
        <li>
          <RouterLink v-if="showLogin" to="/register">register</RouterLink>
          <RouterLink v-if="showMain" to="/" v-on:click="logoutUser">logout</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>

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
import { UserService } from '../services/User.service';
import { RouterLink } from 'vue-router';



export default {
  name: 'App',
  data() {
    return {
      loginToken: localStorage.getItem('loginToken'),
      showMenu: false,
      showLogin: false,
      showMain: false,
      error: ""


    };
  },
  methods: {
    update: function () {
      if (localStorage.getItem('loginToken')) {
        this.showMain = true
        this.showLogin = false
      } else if (localStorage.getItem('loginToken') === null) {
        this.showLogin = true
        this.showMain = false
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logoutUser() {
      UserService.logout(this.session_token)
        .then(logout => {
          console.log("logged Out")
          if (logout) {
            window.location.reload()
          }
        })
        .catch(error => this.error = error)
    }
  },
  created(){
    this.update();
  }
}
</script>

<style scoped>
@media screen {
  .web-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
    font-size: 0.6rem;
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
    width: 50px;
    height: 50px;
    margin-right: 0.5rem;
    padding-left: 1.25%;
  }

  .menu {
    display: none;

  }

  .nav {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    padding-right: 10%;
  }

  .nav ul {
    font-size: 1rem;
    list-style: none;
    display: flex;
    gap: 6rem;
    margin: 0;
    padding: 0;
  }

  .nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }

  .nav a:hover {
    text-decoration: underline;
  }


  .web-footer {
    background-color: #3D5315;
    color: white;
    padding: 1rem;
    text-align: center;
    margin-top: 1rem;
  }

  .web-footer-content {
    display: flex;
    justify-content: space-between;
  }

  .web-footer-copyright {
    width: 100%;
    text-align: center;
    margin-top: 0.7rem;
   
  }


  .web-footer p {
    margin: 0;
    font-size: 0.7rem;
  }

  .web-footer-section {
    margin-right: 7rem;
    font-size: 0.7rem;
    margin-left: 7rem;

  }
}

@media (max-width: 760px) {
  .web-header {
    flex-direction: column;
    align-items: center;
    font-size: x-small;
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

  .nav {
    display: none;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 3rem;
    right: 0rem;
    background-color: #3D5315;
    padding: 2rem;
    border-radius: 5px;
    z-index: 1;

  }

  .nav ul {
    margin-top: 0rem;
    ;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    text-align: center;

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
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    display: block;
    position: absolute;
    right: 1rem;
    margin-top: 0.5rem;

  }

  .nav.nav-open {
    display: flex;
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
    margin-right: 2rem;
    margin-left: 2rem;
  }

  .web-footer p {
    margin: 0;
    font-size: 0.5rem;
  }

  .web-footer-section {
   
    font-size: 0.5rem;
  }
}
</style>