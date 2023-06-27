<template>
  <div class="info" v-if="currentuser == 'Please Log in to see your collected Cards'">
    <h1 id="currentuser">{{ currentuser }}</h1>
  </div>
  <div class="info" v-else>
    <div v-if="checkApiData">
      <Display_Inventory :StatisticApidata="ApiData" />
    </div>
    <div v-else>
      <div class="loading-container">
        <h1 id="LoadingData">Retrieving your Information</h1>
      </div>
    </div>
  </div>
</template>

<script>
import Display_Inventory from '../components/Statistic_Components/Display_Inventory.vue'
import axios from 'axios'

export default {
  name: '',
  components: {
    Display_Inventory
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

.info {
  display: flex;
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