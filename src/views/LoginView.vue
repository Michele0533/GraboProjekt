<template>
  <div class="login-overlay">
    <div class="login-container">
      <div class="login-frame">
        <h2>Login</h2>
        <div class="user-name">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required placeholder="Enter your username">
        </div>
        <div class="user-password">
          <label id="pw" for="password">Password:</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password">
        </div>
        <div class="button-container">
          <button class="button back-button" @click="exitCurrentRouterView()">Back</button>
          <form @submit.prevent="login">
            <button class="button login-button" type="submit">Login</button>
          </form>
        </div>
        <p>users: myuser1234, TestUserForDemo</p>
        <p>pw: Passw0rd!</p>
        <h2>{{ "Status: " + this.message }}</h2>
      </div>
      <div class="login-fame-picture">
        <img
          src="https://i0.wp.com/mynintendonews.com/wp-content/uploads/2019/10/gigantamax-charizard-marketing-art.png?fit=709%2C792&ssl=1"
          class="login-image" />
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  data() {
    return {
      url: 'https://pokecardbackenduser.azurewebsites.net/api/PokeCardLogInTrigger',
      code: 'zzrkFoLkMlBkIcx5qvEBifZzzoxnczy5_rRUGAGpc0k5AzFuplGmMg==',
      message: "warte auf Log In",
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (this.username !== '' && this.password !== '') {
        this.message = "lade..";

        // API Request - Prüfe ob Eingabe korrekt ist.
        axios.get(`${this.url}?username=${this.username}&password=${this.password}&code=${this.code}`)
          .then(response => {
            this.message = response.data;
            setTimeout(() => {
              this.$store.dispatch('setCurrentUser', this.username);    // Speichere den aktuell angemeldeten Benutzer global.
              this.exitCurrentRouterView()                              // Weiterleitung zur vorherigen Seite.
            }, 1500);                                                   // Verzögerung von 1,5 Sekunden
          })
          .catch(error => {
            this.message = error.response.data; // Fehlermeldung ausgeben.
            alert(error.response.data);
          });
      }
    },
    exitCurrentRouterView() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsl(218deg 50% 91%);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.user-name,
.user-password {
  background-color: rgb(252, 204, 0);
  box-shadow: 0 0 2em hsl(231deg 62% 94%);

  padding: 0.5em;
  /* Adjusted padding */
  display: flex;
  flex-direction: column;
  gap: 0.0em;
  border-radius: 15px;
  color: hsl(0deg 0% 30%);
  margin-top: 5%;
  text-align: left;
  /* Align text to the left */

  /* New styles for label */
  font-size: 18px;
  /* Increased font size */
  margin-left: 1%;
  /* Adjusted margin */

}



.user-name input,
.user-password input {
  outline: none;
  border: none;
  font-size: 18px;
  background-color: rgb(252, 204, 0);
  padding: 0em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  border-radius: 0;
  color: hsl(0deg 0% 30%);
  margin-top: 5%;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.button {
  font-size: 17px;
  padding: 10px 20px;
  background-color: rgb(252, 204, 0);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-family: 'Pokemon', sans-serif;
  color: rgb((0 117 190));
  cursor: pointer;
}



.login-frame {


  text-align: center;
  width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.login-fame-picture {
  justify-content: center;
  align-items: center;
}

.login-image {
  width: 450px;
  height: 450px;
  object-fit: cover;
}
</style>
