<template>
  <div class="Main_Component">
    <div class="image-container">
      <img id="logo" :src="imgURL" alt="Logo" />
    </div>
    <div class="button-container">
      <div class="api-data-container">
        <div v-if="apiCallFinish">
          <h1 id="SaveCard"> Log in to save your pulled cards </h1>
          <Generatepack_Component :Uapidata="apidata" v-if="!loggedIn" @generatedPack="receiveGeneratedPack" />
        </div>
        <div v-else>
          <h1 id="SaveCard"> Loading API data...</h1>
        </div>
      </div>
    </div>
    <div>
      <DisplayLastTenCards :uLastCards="lastTenCards" v-if="this.lastTenCardsData" @close="closeOverlay" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import Generatepack_Component from './Generatepack_Component.vue';
import DisplayLastTenCards from './DisplayLastTenCards.vue';

export default {
  name: 'Main_Component',
  components: {
    Generatepack_Component,
    DisplayLastTenCards,

  },
  data() {
    return {
      currentuser: "",
      apidata: [],
      apiCallFinish: false,
      imgURL: "https://nintendo-connect.de/wp-content/uploads/2021/03/oversized-booster-pack_GameStopZing_offer_09_gratisboosterpack@2x.png",
      loggedIn: false,
      lastTenCards: [],
      lastTenCardsData: false
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
      try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards');
        console.log(response.data);
        this.$store.dispatch('setApiData', response.data);
        this.apidata = response.data;
        this.apiCallFinish = true;
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
      this.loggedIn = false;
    },
    openRegisterWindow() {
      this.$router.push('/register'); // Redirect to the register view (router)
    },
    receiveGeneratedPack(pack) {
      // Update the lastTenCards with the received pack
      this.lastTenCards = pack;
      this.lastTenCardsData = true;
      console.log(this.lastTenCards);

    }
  }
}
</script>

<style scoped>
.Main_Component {
  height: 0vh;
}

.image-container {
  float: right;
  width: 40%;
  padding-top: 2%;
  padding-right: 5%;
}

#logo {
  width: 100%;
  height: auto;
}

.button-container {
  height: 25%;
  /*  background-color: rgba(215, 188, 164, 0.196); */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0%;
  margin-left: 0%;
  text-align: center;
  /* Hinzugefügt, um den Inhalt horizontal zu zentrieren */
}

#SaveCard {
  color: white;
  text-align: center;
  text-shadow: 2px 2px #000000;
}
</style>