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

    <h2>Create Account</h2>
    <form @submit.prevent="createAccount">
      <label for="newUsername">Benutzername:</label>
      <input type="text" id="newUsername" v-model="newUsername" required>
      <label for="newPassword">Passwort:</label>
      <input type="password" id="newPassword" v-model="newPassword" required>
      <button type="submit">Account erstellen</button>
    </form>

    <h2>Angemeldet als: {{ currentUser }}</h2>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      newUsername: '',
      newPassword: ''
    };
  },
  methods: {
    login() {
      // Füge hier die Logik für die Überprüfung des Benutzernamens und Passworts hinzu
      if (this.newUsername !== '' && this.newPassword !== '') {
        // Api Call um user von Datenbank zu bestätigen und als aktiven Benutzer setzen.
        const user = {
          username: this.newUsername,
          password: this.newPassword
        };
        this.$store.dispatch('setCurrentUser', user);
        this.$router.go(-1); // Zur vorherigen Seite zurückleiten
        alert('Erfolgreich eingeloggt!');
      } else {
        alert('Ungültige Anmeldeinformationen!');
      }
    },

    createAccount() {
      // Füge hier die Logik für die Erstellung eines neuen Benutzerkontos hinzu
      if (this.newUsername !== '' && this.newPassword !== '') {
        // Api Call um user zur Datenbank hinzuzufügen.
        alert('Account erfolgreich erstellt!');
      } else {
        alert('Ungültige Anmeldeinformationen!');
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    }
  }
};
</script>