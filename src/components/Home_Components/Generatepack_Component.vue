<template>
  <div style="background-color: blue">
    <button @click="generatePack()"> Open a Pack</button>
  </div>
</template>

<script>

export default {
  name: 'Generatepack_Component',
  props: ["Uapidata"],
  data() {
    return {
      pack: [],
    };
  },
  mounted(){
  },
  computed: {

  },
  methods: {
    generatePack(){
      console.log("working");
      let rand = []
      let pack = []
      for(let i=0;i<10;i++){
        rand[i] = Math.floor(Math.random() * 251);
        pack[i] = this.Uapidata.data[rand[i]];
    }

      console.log(pack);
    },
    DisplayPack(){
      Text = packs.names
    }
  }
}
</script>

<style scoped>
</style>