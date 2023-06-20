<template>
  <div>
    <div>
      <img id="logo" :src="logoSrc" />
    </div>
    <div v-if="getapidata">
      <Generatepack_Component :Uapidata="apidata" v-if="!loggedIn" />
      <button @click="openLoginWindow()">Login</button>
      <button v-if="(currentuser != 'warte auf log in..')" @click="logout()">Log out</button>
    </div>
    <div v-else>
      Loading API data...
    </div>
  </div>
  <p> aktueller Benutzer: {{ this.currentuser }} </p>
</template>

<script>
import axios from 'axios'
import Generatepack_Component from './Generatepack_Component.vue'
import { useStore } from 'vuex';  //  VUEX importieren.

export default {
  name: 'Main_Component',
  components: {
    Generatepack_Component
  },
  props: {
    msg: String
  },
  data() {
    return {
      currentuser: "",
      apidata: [],
      getapidata: false,
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pokémon_Trading_Card_Game_logo.svg/1200px-Pokémon_Trading_Card_Game_logo.svg.png',
      loggedIn: false
    };
  },
  computed() {
    return "Tom"; // Beispielwert, den die berechnete Eigenschaft repräsentiert
  },
  mounted() {
    let VUEXuser = this.$store.getters.getCurrentUser;
    console.log("aktueller User: ", VUEXuser);
    if (VUEXuser == null) {
      this.currentuser = "warte auf log in.."
    } else {
      this.currentuser = VUEXuser;
    }
    this.fetchData(); // rufe API Call bei Mounted lifecycle auf.
  },
  methods: {
    async fetchData() {
      try {
          //  Api Call für die Pokemon karten
        const response = await axios.get('https://api.pokemontcg.io/v2/cards');
        this.apidata = response.data;
        this.getapidata = true;
      } catch (error) {
        console.log(error);
      }
    },
    openLoginWindow() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.dispatch('setCurrentUser', null); //  log out logik - gespeicherten angemeldeten user auf null setzen.
      console.log("erfolgreich ausgelogt.");
      this.currentuser="warte auf log in.."
      this.loggedIn = false;
    }
  }
}
</script>

<style>
#logo {
  width: 25%;
  height: 25%;
  margin: 0 auto;
  display: block;
}
</style>