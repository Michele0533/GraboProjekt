<template>
  <div v-if="currentuser == 'du musst dich anmelden um statistiken zu sehen'">
    <p>{{ currentuser }}</p>
  </div>
  <div v-else>
    <div v-if="checkApiData">
      <Display_Statistics :StatisticApidata="ApiData" />
    </div>
    <div v-else>
      <div class="loading-container">
        <p>Userdaten werden von der Datenbank geladen...</p>
        <!-- Hier kannst du einen Ladeindikator oder ein anderes Ladeelement hinzufügen -->
      </div>
    </div>
  </div>
</template>

<script>
import Display_Statistics from '../components/Statistic_Components/Display_Statistics.vue'
import axios from 'axios'

export default {
  name: 'StatisticView',
  components: {
    Display_Statistics
  },

  data() {
    return {
      APIURL:
        'https://pokecardbackenduser.azurewebsites.net/api/PokeCardUserDataTrigger?code=G4EYwdemqSVyTjQXzUa1yO2sg4BM8HjuKfHXREFlym-VAzFu7ezVSQ==',
      currentuser: '',
      checkApiData: false,
      ApiData: {}
    }
  },

  mounted() {
    let VUEXuser = this.$store.getters.getCurrentUser
    if (VUEXuser == null) {
      this.currentuser = 'du musst dich anmelden um statistiken zu sehen'
    } else {
      this.currentuser = VUEXuser
      this.getUserData(this.currentuser)
    }
  },

  methods: {
    async getUserData(USER) {
      try {
        const response = await axios.get(this.APIURL, { params: { username: USER } })
        this.ApiData = response.data
        this.checkApiData = true
      } catch (error) {
        console.error(error)
      }
    }
  },
}
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>