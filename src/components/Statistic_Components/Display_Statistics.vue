<template>
  <div class="StatisticView">
    <div>
      {{ this.APIData  }}
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';  // Import the useStore function from Vuex

export default {
  name: 'Display_Statistics',
  props: ["StatisticApidata"],
  data() {
    return {
      APIData: {},
      currentuser: ""
    };
  },
  mounted() {
    this.APIData = this.StatisticApidata;

    let VUEXuser = this.$store.getters.getCurrentUser;
    if (VUEXuser == null) {
      this.currentuser = "du musst dich anmelden um statistiken zu sehen";
    } else {
      this.currentuser = VUEXuser;
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>