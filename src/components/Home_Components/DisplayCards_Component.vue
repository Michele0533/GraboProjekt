<template>
    <div class="greetings" style="background-color: beige">
      <p> DisplayCards_Component - hier werden die gezogenen Pokemon Karten angezeigt. </p>
      <p>{{ this.packs }}</p>
    </div>
  </template>
  

  <script>
    //  TODO: hier muss die Logik fürs darstellen der gezogenen Karten implementiert werde. 
export default {
  name: 'DisplayCards_Component',
  props: ["packs"],
  data() {
    return {
      Text:'',
    };
  }
}
</script>

<style scoped>
</style>