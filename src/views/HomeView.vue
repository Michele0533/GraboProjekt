<template>
  <main>
    <Main_Component/>
  </main>
</template>

<script>

  //  Main Componente -> hier beginnt die hauptlogik.
  
import Main_Component from '../components/Home_Components/Main_Component.vue'

export default {
  name: 'HomeView',
  components: {
    Main_Component
  }
}
</script>

<style>
  body {
    background-image: url("https://wallpapers.com/images/hd/pokemon-inside-an-enchanted-forest-9cxmmzhqfrt3301l.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>