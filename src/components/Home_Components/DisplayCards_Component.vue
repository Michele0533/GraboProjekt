<template>
    <div class="greetings">
      <p>HomeView : Hello Worldcomp</p>
      <button @click="test()"> Open a Pack</button>
      <p>{{ Text }}</p>
    </div>
  </template>
  

  <script>
    //  TODO: hier muss die Logik fürs darstellen der gezogenen Karten implementiert werde. 
export default {
  name: 'Generatepack_Component',
  props: ["packs"],Text,
  data() {
    return {
      Text:'',
    };
  },
  mounted(){
  },
  computed: {

  },
  methods: {
  }
}
</script>

<style scoped>
</style>