<template>
  <div style="background-color: blue">
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
      pack: [],
      DBindexArray: [], // Here the index of the drawn cards will be stored for the database
      APIURL: 'https://pokecardbackenduser.azurewebsites.net/api/PokeCardUserDataTrigger?code=G4EYwdemqSVyTjQXzUa1yO2sg4BM8HjuKfHXREFlym-VAzFu7ezVSQ=='
    };
  },
  methods: {
    generatePack() {
      console.log("working");
      let rand = [];
      let pack = [];
      let indexArray = [];
      for (let i = 0; i < 10; i++) {
        rand[i] = Math.floor(Math.random() * 251);
        this.DBindexArray[i] = rand[i]; // Add random numbers to the array
        pack[i] = this.Uapidata.data[rand[i]];
      }

      console.log(pack);
      console.log(this.DBindexArray);

         // Call the method to save the drawn cards
      this.sendUserdataToDB("JonasCardsXXX", this.DBindexArray);
    },
    DisplayPack() {
      Text = packs.names;
    },
      // Here the API call for saving the data is made
      //       Funktuniert aktuell einwandfrei.
    async sendUserdataToDB(username, ArrayData) {
      try {
        console.log("Jetzt wird der API call zum speichern aufgerufen");
        const response = await axios.post(this.APIURL, {
          username,
          cards: ArrayData
        });
        // Speichern der API-Daten im Store
        store.dispatch('setApiData', response.data);

        console.log('Data successfully sent to the database:', response.data);
      } catch (error) {
        console.error('Error while sending data to the database:', error);
      }
    }
  }
}
</script>

<style scoped>
</style>