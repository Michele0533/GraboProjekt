<template>
  <div>
    <button @click="generatePack()">Open a Pack</button>
  </div>
  <div>
    <DisplayCards_Component :packs="this.pack" v-if="packGenerated"/>
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
      packGenerated: false,
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
        this.pack[i] = this.Uapidata.data[rand[i]];
      }
        //  konsolenausgabe für gezogenen karten & Methode aufrufen
      this.packGenerated = true
      console.log(this.pack);
      console.log(this.DBindexArray);

        //  user von VUEX abrufen
      let VUEXuser = this.$store.getters.getCurrentUser;
      this.user = VUEXuser
      if(this.user != null){
         this.sendUserdataToDB(this.user, this.DBindexArray);
      } else {
        console.log("um die Karten zu speichern musst du dich anmelden")
      }
     
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