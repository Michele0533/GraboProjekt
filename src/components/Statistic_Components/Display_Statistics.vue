<template>
  <div class="StatisticView">
    <div>
      {{ ArrayAllerBisherGezogenenKartenIndexe }}
    </div>
    <div class="content-container">
      <div class="image-container">
        <img v-for="(src, index) in allPokemonImages" :key="index" :src="src" :class="{ 'grayscale': !ArrayAllerBisherGezogenenKartenIndexe.includes(index) }" alt="All Pokemon Card" v-on:click="showImageDetails(src)">
      </div>
      <div class="sidebar" v-if="selectedImage">
        <h2>Bild Details</h2>
        <img :src="selectedImage" alt="Selected Pokemon Card" class="selected-pokemon-image">
        <!-- Weitere Details oder Informationen zum ausgewählten Bild hier einfügen -->
      </div>
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
      this.currentuser = "Du musst dich anmelden, um Statistiken zu sehen.";
    } else {
      this.currentuser = VUEXuser;
    }
  },
  methods: {
    showImageDetails(image) {
      this.selectedImage = image;
    }
  }
}
</script>

<style scoped>
.content-container {
  display: flex;
}

.image-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pokemon-image {
  margin: 10px;
  transition: transform 0.3s ease; /* Übergangseffekt definieren */
}

.pokemon-image:hover {
  transform: scale(1.1); /* Stiländerung bei Hover */
}

.sidebar {
  width: 300px;
  padding: 10px;
  background-color: #f0f0f0;
}

.selected-pokemon-image {
  max-width: 100%;
  margin-bottom: 10px;
}

.grayscale {
  filter: grayscale(100%);
}
</style>