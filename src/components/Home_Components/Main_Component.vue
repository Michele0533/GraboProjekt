<template>
  <div>
    <div class="image-container">
      <img id="logo" :src="imgURL" alt="Logo" />
    </div>
    <div class="button-container">

      <div class="api-data-container">
        <div v-if="apiCallFinish">
          <Generatepack_Component :Uapidata="apidata" v-if="!loggedIn" />
        </div>
        <div v-else>
          Loading API data...
        </div>
      </div>
      <button v-if="currentuser === 'warte auf log in..'" @click="openLoginWindow()">Login</button>
      <button v-else @click="logout()">Log out</button>
      <button v-if="currentuser === 'warte auf log in..'" @click="openRegisterWindow()">Register</button>
      <p>aktueller Benutzer: {{ currentuser }}</p>
    </div>
  </div>
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
      imgURL: "https://nintendo-connect.de/wp-content/uploads/2021/03/oversized-booster-pack_GameStopZing_offer_09_gratisboosterpack@2x.png",
      loggedIn: false
    };
  },
  mounted() {
    let VUEXuser = this.$store.getters.getCurrentUser;
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
        this.$store.dispatch('setApiData', response.data); 
        this.apidata = response.data;
        this.apiCallFinish = true;

      }).catch((error) => {
        console.log(error);
      });
    },

    openLoginWindow() {
      this.$router.push('/login');  //  zum Anmelde View weiterleiten (router)
    },
    logout() {
      this.$store.dispatch('setCurrentUser', null);   // gespeicherten angemeldeten user auf null setzen.
      console.log("erfolgreich ausgelogt.");
      this.currentuser="warte auf log in.."
      this.loggedIn = false;
    },
    openRegisterWindow() {
      this.$router.push('/register');  //  zum Anmelde View weiterleiten (router)
    },
  }
}
</script>

<style>
  .image-container {
    float: right;
    width: 40%;
    padding-top: 5%;
    background-color: blue;
  }
  
  #logo {
    width: 100%;
    height: auto;
  }
  
  .button-container {
    height: 100%;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  </style>