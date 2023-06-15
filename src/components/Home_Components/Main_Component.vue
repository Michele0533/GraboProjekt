
<template>
  <div class="greetings">
    <p style="background-color: rgb(61, 61, 131)">Main_Component</p>
  </div>

  <Generatepack_Component/>
</template>

<script>
  import axios from 'axios'
  import Generatepack_Component from './Generatepack_Component.vue'
  
  export default {
    name: 'Main_Component',
    components: {
      Generatepack_Component
    },
    props: {
      msg: String
    },
    data() {
      return {
        
      };
    },
    mounted(){
      this.fetchData();
    },
    methods: {
      async fetchData(){
        await axios.get('https://api.pokemontcg.io/v2/cards')
          .then((response) => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          });
      }
    }
  }
  </script>