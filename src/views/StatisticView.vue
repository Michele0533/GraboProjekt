<template>
  <div class="about">
    <Display_Statistics :username="username" />
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
        APIURL: "https://pokecardbackenduser.azurewebsites.net/api/PokeCardUserDataTrigger?code=G4EYwdemqSVyTjQXzUa1yO2sg4BM8HjuKfHXREFlym-VAzFu7ezVSQ==",
        username: 'JonasCardsXXX' 
      }
    },
    created() {
      this.getUserData()
    },
    methods: {
      async getUserData() {
        try {
            //  API Call um die gesammten Karten von "username".
            //  wichtig:  funktuniert nur wenn der USER in DB existiert, sonnst fehlermeldung.
          const response = await axios.get(this.APIURL, {
            params: {
              username: this.username
            }
          })
          console.log(response.data)
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style>
</style>