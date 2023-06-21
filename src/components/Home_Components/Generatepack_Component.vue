<template>
  <div>
    <button @click="generatePack()" class="open-pack-button">Open a Pack</button>
  </div>
  <div>
    <DisplayCards_Component :packs="pack" :key="packKey" v-if="makeDisplayCardsVisible" @close="closeDisplayCardsOverlay" @generatePack="generatePack" />
  </div>
</template>

<script>
import DisplayCards_Component from './DisplayCards_Component.vue'
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  name: 'Generatepack_Component',
  props: ["Uapidata"],
  components: {
    DisplayCards_Component
  },
  data() {
    return {
      makeDisplayCardsVisible: false,
      user: "",
      pack: [],
      packKey: 0, // Initialer Schlüsselwert
      DBindexArray: [],
      APIURL: 'https://pokecardbackenduser.azurewebsites.net/api/PokeCardUserDataTrigger?code=G4EYwdemqSVyTjQXzUa1yO2sg4BM8HjuKfHXREFlym-VAzFu7ezVSQ=='
    };
  },
  methods: {
    generatePack() {
      let rand = [];
      let pack = [];
      let indexArray = [];
      for (let i = 0; i < 10; i++) {
        rand[i] = Math.floor(Math.random() * 251);
        this.DBindexArray[i] = rand[i];
        this.pack[i] = this.Uapidata.data[rand[i]];
      }

      this.makeDisplayCardsVisible = true;

      let VUEXuser = this.$store.getters.getCurrentUser;
      this.user = VUEXuser;
      if (this.user != null) {
        this.sendUserdataToDB(this.user, this.DBindexArray);
      } else {
        console.log("Um die Karten zu speichern, musst du dich anmelden.");
      }

      this.packKey += 1; // Den Schlüssel aktualisieren, um die Komponente neu zu rendern
    },

    closeDisplayCardsOverlay() {
      this.makeDisplayCardsVisible = false;
    },

    async sendUserdataToDB(username, ArrayData) {
      try {
        console.log("Deine gezogenen Karten werden jetzt gespeichert, " + this.user);
        const response = await axios.post(this.APIURL, {
          username,
          cards: ArrayData
        });
        console.log('Status:', response.data);
      } catch (error) {
        console.error('Status:', error);
      }
    }
  }
}
</script>

<style scoped>
.open-pack-button {
  padding: 12px 24px;
  font-size: 16px;
  background-color: #ffcd11;
  border: none;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.open-pack-button:hover {
  background-color: #ffc400;
}
</style>