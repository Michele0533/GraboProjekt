<template>
  <div class="StatisticView">
    <div class="content-container">
      <div class="image-container">
        <img v-for="(src, index) in allPokemonImages" :key="index" :src="src" class="pokemon-image"
          :class="{ 'grayscale': !ArrayAllerBisherGezogenenKartenIndexe.includes(index) }" alt="All Pokemon Card"
          @click="showImageDetails(index)">
      </div>
      <div class="sidebar" v-if="selectedImage">
        <img :src="selectedImage.images.large" alt="Selected Pokemon Card" class="selected-pokemon-image"
          style="padding-top: 10%; padding-bottom: 50px;">
        <div class="textInformationStyle">Name: {{ selectedImage.name }}</div>
        <div class="textInformationStyle">Type: {{ selectedImage.types[0] }}</div>
        <div class="textInformationStyle">Price(low): {{ selectedImage.cardmarket.prices.lowPrice }}€</div>
        <div class="textInformationStyle">Price(avg30): {{ selectedImage.cardmarket.prices.avg30 }}€</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  name: 'Display_Inventory',
  props: ["StatisticApidata"],
  data() {
    return {
      APIData: {},
      currentuser: "",
      allPokemonCards: {},
      allPokemonImages: [],
      ArrayAllerBisherGezogenenKartenIndexe: [],
      selectedImage: null
    };
  },
  mounted() {
    this.APIData = this.StatisticApidata;
    let VUEXuser = this.$store.getters.getCurrentUser;
    let vuexDatenAllerPokemon = this.$store.getters.getApiData;
    this.allPokemonCards = vuexDatenAllerPokemon.data;

    // Objekt aus DB in Array mit Index umwandeln
    this.ArrayAllerBisherGezogenenKartenIndexe = this.APIData.map((obj, index) => parseInt(Object.keys(obj)[0]));

    // Array, in dem nur die Bilder "SRC" gespeichert werden
    for (let pokemon in this.allPokemonCards) {
      this.allPokemonImages.push(this.allPokemonCards[pokemon].images.large);
    }

    // Prüfe, ob der Benutzer angemeldet ist
    if (VUEXuser == null) {
      this.currentuser = "Please Log in to see your collected Cards";
    } else {
      this.currentuser = VUEXuser;
    }
  },
  methods: {
    showImageDetails(index) {
      console.log(this.selectedImage)
      this.selectedImage = this.allPokemonCards[index];
    }
  }
}
</script>

<style scoped>
.textInformationStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;
  text-align: center;
  width: 50%;
  height: 5%;
  margin: 5px auto;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  font-family: 'Pokemon', sans-serif;
}

.content-container {
  display: flex;

}

.image-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: scroll;
  scrollbar-width: none;
  height: 80vh;
}

.image-container::-webkit-scrollbar {
  display: none;
  /* Hide the scrollbar for Chrome, Safari, and Opera */
}

.pokemon-image {
  width: 13%;
  margin: 10px;
  transition: transform 0.3s ease;
  /* Übergangseffekt definieren */
}

.pokemon-image:hover {
  transform: scale(1.1);
  /* Stiländerung bei Hover */
}

.sidebar {
  width: 20%;
  padding: 5px;
  border: 1px solid rgb(252, 204, 0);
  backdrop-filter: brightness(60%);
  border-radius: 10px;
  margin-top: 0px;
  margin-right: 20px;
  overflow-y: auto;
  height: 75vh;
  scrollbar-width: none;
}

.selected-pokemon-image {
  max-width: 60%;
  margin: 0 auto;
  /* Mittig zentrierte Ausrichtung */
  display: block;
  /* Element als Blockelement anzeigen */
  margin-bottom: 10px;
}

.grayscale {
  filter: invert(42%);
}
</style>