<template>
  <div class="StatisticView">
    <p> {{ currentUser }} </p>
    <div v-if="currentUser !== 'warte auf log in..'">
      <button @click="printAPIData">geb PokeAPI daten von VUEX in Konsole aus </button>
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex';  //  VUEX importieren.

export default {
  name: 'Display_Statistics',
  props: ["StatisticApidata"],
  data() {
    return {
      APIData: {},
      currentUser: ""
    };
  },
  mounted() {
    this.APIData = this.StatisticApidata;

    let VUEXuser = this.$store.getters.getCurrentUser;
    if (VUEXuser == null) {
      this.currentUser = "warte auf log in..";
    } else {
      this.currentUser = VUEXuser;
    }
  },
  methods: {
    printAPIData() {
      let pokemonAPIdata = this.$store.getters.getApiData
      console.log(pokemonAPIdata);      // geb alle karten von der API in Konsole aus
      //console.log(this.APIData);      // geb alle vom user gezogenen karten in Konsole aus
    }
  }
};
</script>

<style scoped>
</style>