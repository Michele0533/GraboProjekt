<template>
  <div class="image-container">
    <div class="row" v-for="(row, rowIndex) in cardRows" :key="rowIndex">
      <img v-for="(card, cardIndex) in row" :key="cardIndex" :src="card" alt="Pokemon Card" class="pokemon-image"
        :style="{ marginRight: cardIndex !== row.length - 1 ? '30px' : '0' }">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisplayLastTenCards',
  props: ['uLastCards'],
  computed: {
    cardRows() {
      const numRows = 2;
      const cardsPerRow = Math.ceil(this.uLastCards.length / numRows);

      let index = 0;
      const rows = [];
      while (index < this.uLastCards.length) {
        const row = this.uLastCards.slice(index, index + cardsPerRow).map(pokemon => pokemon.images.large);
        rows.push(row);
        index += cardsPerRow;
      }

      return rows;
    }
  }
}
</script>

<style scoped>
.pokemon-image:hover {
  transform: scale(1.1);
}

.image-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: red;
}

.row {
  display: flex;
  margin-bottom: 30px;
}

.pokemon-image {
  max-width: 75px;
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
