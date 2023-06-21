<template>
  <div>
    <div class="greetings">
      <div class="image-container">
        <div class="row" v-for="(row, rowIndex) in cardRows" :key="rowIndex">
          <img v-for="(card, cardIndex) in row" :key="cardIndex" :src="card" alt="Pokemon Card" class="pokemon-image" :style="{ marginRight: cardIndex !== row.length - 1 ? '30px' : '0' }">
        </div>
      </div>
      <div class="buttons-container">
        <button @click="closeOverlay()" class="button pokemon-button">Close</button>
        <button @click="openAnother()" class="button pokemon-button">Open Another One</button>
      </div>
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
  watch: {
    packs: {
      immediate: true, // Aktualisierung beim Mounten der Komponente
      handler(newVal) {
        this.packlist = newVal;
        this.splitCardsIntoRows();
      }
    }
  },
  methods: {
    closeOverlay() {
      this.$emit('close'); // Event auslösen, um das Overlay zu schließen
    },

    openAnother() {
      setTimeout(() => {
        this.$emit('generatePack'); // Event auslösen, um ein neues Pack zu öffnen
      }, 1000);
    },

    splitCardsIntoRows() {
      const pokemonNames = Object.values(this.packlist);
      const numRows = 3;
      const cardsPerRow = Math.ceil(pokemonNames.length / numRows);

      this.cardRows = [];
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .image-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .row {
    display: flex;
    margin-bottom: 30px;
  }
  
  .buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3%;
  }
  
  .button {
    margin: 0 10px;
    background-color: #ffcd11;
    border: none;
    border-radius: 20px;
    color: #000;
    font-weight: bold;
    padding: 12px 24px; /* Adjust the padding values */
    font-size: 16px; /* Adjust the font size */
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .button:hover {
    background-color: #ffc400;
  }
  
  .pokemon-button {
    background-color: #f05030;
    color: #fff;
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