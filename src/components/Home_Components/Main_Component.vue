<template>
  <div>
    <div>
      <img id="logo" :src="logoSrc" />
    </div>
    <div v-if="apiCallFinish">
      <Generatepack_Component :Uapidata="apidata" v-if="!loggedIn" />
    </div>
    <div v-else>
      Loading API data...
    </div>
  </div>
  <p> aktueller Benutzer: {{ this.currentuser }} </p>
  <button v-if="(currentuser == 'warte auf log in..')" @click="openLoginWindow()">Login</button>
  <button v-if="(currentuser != 'warte auf log in..')" @click="logout()">Log out</button>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex';
import Generatepack_Component from './Generatepack_Component.vue'

export default {
  name: 'Main_Component',
  components: {
    Generatepack_Component
  },
  data() {
    return {
      currentuser: "",
      apidata: [],
      apiCallFinish: false,
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pokémon_Trading_Card_Game_logo.svg/1200px-Pokémon_Trading_Card_Game_logo.svg.png',
      loggedIn: false
    };
  },
  mounted() {
    let VUEXuser = this.$store.getters.getCurrentUser;
    console.log("aktueller User: ", VUEXuser);
    if (VUEXuser == null) {
      this.currentuser = "warte auf log in.."
    } else {
      this.currentuser = VUEXuser;
    }
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await axios.get('https://api.pokemontcg.io/v2/cards').then((response) => {
        console.log(response.data)
        this.apidata = response.data;
        this.apiCallFinish = true;

      }).catch((error) => {
        console.log(error);
      });
    },

//  -----------------------------------------------------------------------------------------------------------------------------------
//                                                      Methoden für Log in/out
    openLoginWindow() {
      this.$router.push('/login');  //  zum Anmelde View weiterleiten (router)
    },

    logout() {
      this.$store.dispatch('setCurrentUser', null);   // gespeicherten angemeldeten user auf null setzen.
      console.log("erfolgreich ausgelogt.");
      this.currentuser="warte auf log in.."
      this.loggedIn = false;
    }

//  -----------------------------------------------------------------------------------------------------------------------------------
 
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