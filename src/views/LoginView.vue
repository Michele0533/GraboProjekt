<template>
  <div class="login-overlay">
    <div class="login-container">
    </div>
    <div class="login-frame">
      
      <h2>Login</h2>
      <div class="user-Eingabe">
        <label for="username">Benutzername:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="user-Eingabe">
        <label for="password">Passwort:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <form @submit.prevent="login">
        <button type="submit">Einloggen</button>
      </form>
      <p>users: myuser1234, TestUserForDemo</p>
      <p>pw: Passw0rd!</p>
      <h2>{{ "Status: " + this.message }}</h2>
      <button @click="exitCurrentRouterView()">Zurück</button>
    </div>
    <div class="login-fame-picture">
      <img src="https://i0.wp.com/mynintendonews.com/wp-content/uploads/2019/10/gigantamax-charizard-marketing-art.png?fit=709%2C792&ssl=1" class="login-image" />
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
    exitCurrentRouterView(){
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
  justify-content: center;
  align-items: center;
}

.user-Eingabe {
  margin-bottom: 10px;
}

.login-frame {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-left: 200px;
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
