<template>
  <div>
    <button @click="generatePack()">Open a Pack</button>
  </div>
</template>

<script>
import axios from 'axios'; // Import the axios library
import { useStore } from 'vuex';

export default {
  name: 'Generatepack_Component',
  props: ["Uapidata"],
  data() {
    return {
      user: "",
      pack: [],
      DBindexArray: [],
      APIURL: 'https://pokecardbackenduser.azurewebsites.net/api/PokeCardUserDataTrigger?code=G4EYwdemqSVyTjQXzUa1yO2sg4BM8HjuKfHXREFlym-VAzFu7ezVSQ=='
    };
  },
  methods: {
      //  Methode um ein pack mit 10 zufälligen karten zu erstellen.
    generatePack() {
      let rand = [];
      let pack = [];
      let indexArray = [];
      for (let i = 0; i < 10; i++) {
        rand[i] = Math.floor(Math.random() * 251);
        this.DBindexArray[i] = rand[i];
        pack[i] = this.Uapidata.data[rand[i]];
      }
        //  konsolenausgabe für gezogenen karten & Methode aufrufen
      console.log(pack);
      console.log(this.DBindexArray);

        //  user von VUEX abrufen
      let VUEXuser = this.$store.getters.getCurrentUser;
      this.user = VUEXuser
      this.sendUserdataToDB(this.user, this.DBindexArray);
    },


      // Methode um die gezogenen karten in die Datenbank zu Speichern.
    async sendUserdataToDB(username, ArrayData) {
      try {
        console.log("deine gezogenen karten werden jetzt gespeichert, " + this.user);
        const response = await axios.post(this.APIURL, {
          username,
          cards: ArrayData
        });
        console.log('Status: ', response.data);
      } catch (error) {
        console.error('Status: ', error);
      }
    }
  }
}
</script>

<style scoped>
</style>