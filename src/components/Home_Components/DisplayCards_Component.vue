

<template>
    <div class="greetings">
      <p>HomeView : Hello Worldcomp</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'ArticlesComp',
    props: {
      msg: String
    },
    data() {
      return {
        
      };
    },
    mounted(){
           //API Daten aufrufen beim lifecyle "Mounted - hinzufügen im DOM"
        this.fetchData()
    },
    computed: {
      
    },
    methods: {
        // Methode für API Call
      async fetchData(){
        await axios.get('https://api.pokemontcg.io/v2/cards').then((response) => {
          console.log(response)
        }).catch(error => {
          console.log(error)
          this.isLoading = false
        });
      }
    }
  }
  </script>
  
  <style scoped>
  </style>