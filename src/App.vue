<template>
  <div class="background">
    <header>
      <nav style="display: flex; justify-content: space-between; align-items: center;">
        <div class="logo-container">
          <img class="logo"
            src="https://cdn.discordapp.com/attachments/1074826548235993148/1121555724292608101/073EE5AF-698E-4CA0-BD00-F0AADC5A0226.PNG"
            alt="no Picture" />
        </div>

        <div class="nav-links">
          <RouterLink id="Nav-Buttons" class="nav-link" to="/">Home</RouterLink>
          <RouterLink id="Nav-Buttons" class="nav-link" to="/statistic">Inventory</RouterLink>
          <RouterLink id="Nav-Buttons" class="nav-link" to="/contact">SpielerKarte</RouterLink>

          <div class="auth-buttons">
            <button v-if="currentuser !== 'warte auf log in..'" class="pokemon-button logout-button"
              @click="logout()">Logout</button>
            <button v-else class="pokemon-button login-button" @click="openLoginWindow()">Login</button>
            <button v-if="currentuser === 'warte auf log in..'" class="pokemon-button register-button"
              @click="openRegisterWindow()">Register</button>
            <h2 id="currentuser"> {{ currentuser }} </h2>
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

<style>
.logo {
  max-width: 300px;
  /* Ändern Sie den Wert auf die gewünschte Größe */
  padding-left: 50px;
  /* Zusätzliche CSS-Eigenschaften für die Gestaltung des Logos */
}

.nav-links {
  margin-right: 3%;
  display: flex;
  align-items: center;
  border-radius: 10px;
}

.auth-buttons {
  margin-left: 50px;
}

.nav-link {
  margin-right: 3%;
  font-size: 20px;
  margin-right: 10px;
  /* Ändern Sie den Wert auf den gewünschten Abstand */
  text-decoration: none;
  color: #f88c1c;
  font-family: 'Pokemon', sans-serif;
}

#Nav-Buttons:hover {
  background-color: #e36209;
}

#Nav-Buttons:active {
  background-color: #b74a07;
  transform: translateY(1px);
}

#Nav-Buttons {
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
  margin-right: 10px;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  font-family: 'Pokemon', sans-serif;
  cursor: pointer;
  background-color: rgb(252, 204, 0);
  /* Ändern Sie den Wert auf den gewünschten Abstand */
}

.logout-button {
  margin-right: 10px;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  font-family: 'Pokemon', sans-serif;
  cursor: pointer;
  /* Ändern Sie den Wert auf den gewünschten Abstand */
  /* Ändern Sie den Wert auf den gewünschten Abstand */

}

.register-button {
  margin-right: 10px;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  font-family: 'Pokemon', sans-serif;
  cursor: pointer;
  background-color: rgb(252, 204, 0);
  /* Ändern Sie den Wert auf den gewünschten Abstand */
  /* Ändern Sie den Wert auf den gewünschten Abstand */
  /* Ändern Sie den Wert auf den gewünschten Abstand */
}

.pokemon-button:hover {
  background-color: #e36209;
}

.pokemon-button:active {
  background-color: #b74a07;
  transform: translateY(1px);
}

body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;

}

.background {
  background-image: url("https://wallpapers.com/images/hd/pokemon-inside-an-enchanted-forest-9cxmmzhqfrt3301l.jpg");
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#currentuser {
  color: white;
  text-align: center;
  text-shadow: 2px 2px #000000;
}
</style>