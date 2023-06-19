<template>
    <div style="background-color: blue">
      <button @click="generatePack()"> press me</button>
    </div>
  </template>
  
  <script>

  export default {
    name: 'Generatepack_Component',
    props: {
      msg: String
    },
    data() {
      return {
      };
    },
    mounted(){
    },
    computed: {
      
    },
    methods: {
      generatePack(){
        console.log("working");
      }
    }
  }
  </script>
  
  <style scoped>
  </style>