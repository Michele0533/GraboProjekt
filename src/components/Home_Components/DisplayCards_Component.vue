<template>
  <div class="greetings">
    <div class="image-container">
      <div class="row" v-for="(row, rowIndex) in cardRows" :key="rowIndex">
        <img v-for="(card, cardIndex) in row" :key="cardIndex" :src="card" alt="Pokemon Card" class="pokemon-image" :style="{ marginRight: cardIndex !== row.length - 1 ? '10px' : '0' }">
      </div>
    </div>
    <div class="buttons-container">
      <button @click="closeOverlay()" class="button">close</button>
      <button @click="openAnother()" class="button">open anotherone</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayCards_Component',
  props: ["packs"],
  data() {
    return {
      Text: '',
      packlist: {},
      cardRows: []
    };
  },
  mounted() {
    console.log("mounted aufgerufen")
    this.packlist = this.packs;
    this.splitCardsIntoRows();
  },
  methods: {
    closeOverlay() {
        //  hier jetzt logik um die komponente zu beenden
      this.$parent.closeDisplayCardsOverlay();
    },

    openAnother(){
        //  hier jetzt logik für neues Pack 
      this.$parent.generatePack();
    },
    splitCardsIntoRows() {
        //  Methode von chat GPT -> alternative wären hardcoded 3 Arrays
      const pokemonNames = Object.values(this.packlist);
      const numRows = 3;
      const cardsPerRow = Math.ceil(pokemonNames.length / numRows);

      let index = 0;
      while (index < pokemonNames.length) {
        const row = pokemonNames.slice(index, index + cardsPerRow).map(pokemon => pokemon.images.large);
        this.cardRows.push(row);
        index += cardsPerRow;
      }
    }
  }
}
</script>

<style scoped>
  .greetings {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column; /* Änderung: Anordnung in Spalten */
    justify-content: center;
    align-items: center;
  }
  
  .image-container {
    flex: 1;
    display: flex;
    flex-direction: column; /* Änderung: Anordnung in Spalten */
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .row {
    display: flex;
    margin-bottom: 10px;
  }
  
  .buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3%;
  }
  
  .button {
    margin: 0 10px;
  }
  
  .pokemon-image {
    max-width: 220px;
    margin-right: 10px;
    transition: transform 0.3s ease;
  }
  
  .pokemon-image:last-child {
    margin-right: 0;
  }
  
  .pokemon-image:hover {
    transform: scale(1.1);
  }
  </style>