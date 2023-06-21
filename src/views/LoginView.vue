<template>
  <div class="login-overlay">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Benutzername:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Passwort:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Einloggen</button>
    </form>
    <p> users: myuser1234 , TestUserForDemo </p>
    <p> pw:    Passw0rd! </p>
    <h2>{{ "Status: " + this.message }}</h2>
    <button @click="exitCurrentRouterView()"> Zurück </button>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>