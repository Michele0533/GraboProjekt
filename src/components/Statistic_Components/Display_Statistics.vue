<template>
  <div class="StatisticView" >
    <div>
      {{ this.APIData }}
    </div>
    <div class="image-container">
      <img v-for="pokemon in allPokemonImages" :key="pokemon" :src="pokemon" alt="All Pokemon Card" class="pokemon-image">
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Display_Statistics',
  props: ["StatisticApidata"],
  data() {
    return {
      APIData: {},
      currentuser: "",
      allPokemonCards: {},
      allPokemonImages: []
    };
  },
  mounted() {
    this.APIData = this.StatisticApidata;
    let VUEXuser = this.$store.getters.getCurrentUser;
    let vuexApiData = this.$store.getters.getApiData;
    this.allPokemonCards = vuexApiData.data;

    // Iterate over the object
    for (let pokemon in this.allPokemonCards) {
      this.allPokemonImages[pokemon] = this.allPokemonCards[pokemon].images.large;
    }

// Annahme: Du hast das Array mit dem Namen "data"


// Oder Verwendung von forEach()
/*this.APIData.forEach(obj => {
  const index = obj.index;
  const anzahl = obj.anzahl;

  console.log(`Index: ${index}, Anzahl: ${anzahl}`);
}); */

    // Check if the user is logged in
    if (VUEXuser == null) {
      this.currentuser = "Du musst dich anmelden, um Statistiken zu sehen.";
    } else {
      this.currentuser = VUEXuser;
    }
  },
  methods: {}
}
</script>

<style scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pokemon-image {
  max-width: 150px;
  margin: 10px;
}
</style>