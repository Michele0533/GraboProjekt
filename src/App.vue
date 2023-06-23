<template>
  <div class="background">
    <header>
      <nav style="display: flex; justify-content: space-between; align-items: center;">
        <div class="logo-container">
          <img class="logo" src="https://cdn.discordapp.com/attachments/1074826548235993148/1121555724292608101/073EE5AF-698E-4CA0-BD00-F0AADC5A0226.PNG" alt="no Picture" />
        </div>

        <div class="nav-links">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
          <RouterLink class="nav-link" to="/statistic">Pokedex</RouterLink>
          <RouterLink class="nav-link" to="/contact">SpielerKarte</RouterLink>

          <div class="auth-buttons">
            <h2> {{ currentuser }} </h2>
            <button v-if="currentuser !== 'warte auf log in..'" class="pokemon-button logout-button" @click="logout()">Log out</button>
            <button v-else class="pokemon-button login-button" @click="openLoginWindow()">Login</button>
            <button v-if="currentuser === 'warte auf log in..'" class="pokemon-button register-button" @click="openRegisterWindow()">Register</button>
          </div>
        </div>

      </nav>
    </header> 
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import axios from 'axios'
  import { useStore } from 'vuex';
  
  export default {
    components: {
      RouterLink,
      RouterView
    },
    data() {
      return {
        currentuser: 'warte auf log in..'
      }
    },
    mounted() {
      this.fetchData();
    },
    watch: {
      '$store.getters.getCurrentUser'(newUser) {
        this.currentuser = newUser || 'warte auf log in..';
      }
    },
    methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards');
        console.log(response.data);
        this.$store.dispatch('setApiData', response.data);
      } catch (error) {
        console.log(error);
      }
    },

    openLoginWindow() {
      this.$router.push('/login'); // Redirect to the login view (router)
    },
    logout() {
      this.$store.dispatch('setCurrentUser', null); // Set the logged-in user to null.
      console.log("Successfully logged out.");
      this.currentuser = "warte auf log in..";
    },
    openRegisterWindow() {
      this.$router.push('/register'); // Redirect to the register view (router)
    }
  }
}
  </script>

<style scoped>
.logo {
  max-width: 300px; /* Ändern Sie den Wert auf die gewünschte Größe */
  padding-left: 50px;
  padding-top: 25px;
  /* Zusätzliche CSS-Eigenschaften für die Gestaltung des Logos */
}

.nav-links {
  margin-right: 3%;
  display: flex;
  align-items: center;
}

.auth-buttons {
  margin-left: 50px; /* Fügen Sie 50px linken Rand hinzu */
}

nav a:not(:last-of-type)::after {
  content: "|";
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.nav-link {
  margin-right: 3%;
  font-size: 20px;
  margin-right: 10px; /* Ändern Sie den Wert auf den gewünschten Abstand */
  text-decoration: none;
  color: #f88c1c;
  font-family: 'Pokemon', sans-serif;
}

.pokemon-button {
  font-size: 20px;
  padding: 10px 20px;
  background-color: #f88c1c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-family: 'Pokemon', sans-serif;
  cursor: pointer;
}

.login-button {
  margin-right: 10px; /* Ändern Sie den Wert auf den gewünschten Abstand */
}

.logout-button {
  margin-right: 10px; /* Ändern Sie den Wert auf den gewünschten Abstand */
}

.register-button {
  margin-right: 10px; /* Ändern Sie den Wert auf den gewünschten Abstand */
}

.pokemon-button:hover {
  background-color: #e36209;
}

.pokemon-button:active {
  background-color: #b74a07;
  transform: translateY(1px);
}

.background {
  background-image: url("https://www.wallpapertip.com/wmimgs/70-704405_amazing-hd-enchanted-forest-enchanted-forest-wallpaper-hd.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
}
</style>