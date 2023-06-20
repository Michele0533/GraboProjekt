<template>
    <div class="greetings" style="background-color: beige">
      <p> DisplayCards_Component - hier werden die gezogenen Pokemon Karten angezeigt. </p>
      <p>{{ this.pokemonNames }}</p>
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
      packlist: {},
      pokemonNames: []
    };
  },
  mounted() {
    this.packlist = this.packs;
    console.log(this.packlist);
    for (let pokemon in this.packlist) {
      this.pokemonNames[pokemon] = this.packlist[pokemon].name;
    }
    console.log(this.pokemonNames)
  }
}
</script>

<style scoped>
</style>