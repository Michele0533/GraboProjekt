<template>
  <div class="test" v-if="currentuser == 'Please Log in to see your collected Cards'">
    <h1 id="currentuser">{{ currentuser }}</h1>
  </div>
  <div class="test" v-else>
    <div v-if="checkApiData">
      <Display_Statistics :StatisticApidata="ApiData" />
    </div>
    <div v-else>
      <div class="loading-container">
        <h1 id="LoadingData">Retrieving your Information</h1>
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
      this.currentuser = 'Please Log in to see your collected Cards'
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

.test {
  height: 800px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#LoadingData {
  color: white;
  text-align: center;
  text-shadow: 2px 2px #000000;
}

#currentuser {
  color: white;
  text-align: center;
  text-shadow: 2px 2px #000000;
}
</style>