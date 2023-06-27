<template>
  <div>
    <div class="greetings">
      <div class="image-container">
        <div class="row" v-for="(row, rowIndex) in cardRows" :key="rowIndex">
          <div class="pokemon-card" v-for="(card, cardIndex) in row" :key="cardIndex">
            <img :src="card.image" alt="Pokemon Card" class="pokemon-image">
          </div>
        </div>
      </div>
      <div class="buttons-container">
        <button @click="closeOverlay()" class="button pokemon-button">Close</button>
        <button @click="openAnother()" class="button pokemon-button">Open Another One</button>
        <div class="totals-container">
          <div class="total-price">
            Total Price (low): {{ calculateTotalPrice('lowPrice') }}€
            Total Price (avg30): {{ calculateTotalPrice('avg30') }}€
          </div>
        </div>
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
      cardRows: [],
    };
  },
  watch: {
    packs: {
      immediate: true,
      handler(newVal) {
        this.packlist = newVal;
        this.splitCardsIntoRows();
      }
    }
  },
  methods: {
    closeOverlay() {
      this.$emit('close');
    },

    openAnother() {
      setTimeout(() => {
        this.$emit('generatePack');
      }, 1000);
    },

    splitCardsIntoRows() {
      const pokemonNames = Object.values(this.packlist);
      const numRows = 2;
      const cardsPerRow = Math.ceil(pokemonNames.length / numRows);

      this.cardRows = [];
      let index = 0;
      while (index < pokemonNames.length) {
        const row = pokemonNames.slice(index, index + cardsPerRow).map(pokemon => ({
          image: pokemon.images.large,
          showPrices: false,
          prices: pokemon.cardmarket.prices
        }));
        this.cardRows.push(row);
        index += cardsPerRow;
      }
    },

    showPrices(card) {
      this.cardRows.forEach(row => {
        row.forEach(c => {
          c.showPrices = false;
        });
      });
      card.showPrices = true;
    },

    hidePrices(card) {
      card.showPrices = false;
    },

    calculateTotalPrice(priceKey) {
      let totalPrice = 0;
      this.cardRows.forEach(row => {
        row.forEach(card => {
          totalPrice += card.prices[priceKey];
        });
      });
      return totalPrice.toFixed(2);
    }
  }
}
</script>


<style scoped>
.greetings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(5px);
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.row {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.pokemon-card {
  position: relative;
  margin-right: 20px;
}

.pokemon-image {
  max-width: 190px;
  height: auto;
  margin-right: 20px;
  transition: transform 0.3s ease;
}

.pokemon-image:last-child {
  margin-right: 0;
}

.pokemon-image:hover {
  transform: scale(1.1);
}

.prices-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.row-prices {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.card-price {
  margin: 0 10px;
  text-align: center;
}

.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.button {
  margin: 0 10px;
  background-color: #ffcd11;
  border: none;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding: 12px 24px;
  font-size: 16px;
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

.totals-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.total-price {
  padding: 10px;
  border: 1px solid rgb(252, 204, 0);
  backdrop-filter: brightness(60%);
  border-radius: 10px;
  margin-right: 20px;
  font-size: 16px;
  overflow-y: auto;
  scrollbar-width: none;
}
</style>
