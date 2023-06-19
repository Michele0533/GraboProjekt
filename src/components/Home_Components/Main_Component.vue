<template>
  <div>
    <div>
      <img id="logo" :src="logoSrc" />
    </div>
    <div v-if="getapidata">
      <Generatepack_Component :Uapidata="apidata" v-if="!loggedIn" />
      <button v-else @click="logout">Logout</button>
      <div v-if="!loggedIn">
        <button @click="openLoginWindow">Log In</button>
      </div>
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
  computed: {
      //  hier sollte eig der global gespeicherter Benutzer aufgerufen werden - funktuniert somhow nicht so richtig.
    currentUser() {
      const store = useStore();
      let user = store.getters.getCurrentUser;
      console.log("aktueller User: " ,user);
      return user
    }
  },
  mounted() {
    this.fetchData();
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