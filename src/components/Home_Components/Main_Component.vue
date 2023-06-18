<template>
  <div>
    <div>
      <img id="logo" :src="logoSrc" />
    </div>
    <div v-if="getapidata">
      <Generatepack_Component :Uapidata="apidata" />
    </div>
    <div v-else>
      Loading API data...
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import Generatepack_Component from './Generatepack_Component.vue'

export default {
  name: 'Main_Component',
  components: {
    Generatepack_Component,
},
  props: {
    msg: String
  },
  data() {
    return {
      apidata: [],
      getapidata: false,
      logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pokémon_Trading_Card_Game_logo.svg/1200px-Pokémon_Trading_Card_Game_logo.svg.png'
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://api.pokemontcg.io/v2/cards');
        this.apidata = response.data;
        this.getapidata = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style>
#logo {
  width: 25%;
  height: 25%;
  margin: 0 auto;
  display: block;
}
</style>
