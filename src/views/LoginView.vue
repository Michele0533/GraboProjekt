<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Benutzername:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Passwort:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Einloggen</button>
    </form>
    <p> Example: myuser1234     Passw0rd! </p>
    <h2>{{ "Status: " + this.message }}</h2>
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
              this.$router.go(-1);                                      // Weiterleitung zur vorherigen Seite.
            }, 1500); // Verzögerung von 1,5 Sekunden
          })
          .catch(error => {
            this.message = error.response.data; // Fehlermeldung ausgeben.
            alert(error.response.data);
          });
      }
    }
  }
};
</script>