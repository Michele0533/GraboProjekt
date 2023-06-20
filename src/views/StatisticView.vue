<template>
  <div>
    <Display_Statistics v-if="checkApiData" :StatisticApidata="this.ApiData" />
    <div v-else>
      Userdaten werden von der Datenbank geladen...
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
        APIURL: "https://pokecardbackenduser.azurewebsites.net/api/PokeCardUserDataTrigger?code=G4EYwdemqSVyTjQXzUa1yO2sg4BM8HjuKfHXREFlym-VAzFu7ezVSQ==",
        username: 'JonasCardsXXX',
        checkApiData: false,
        ApiData: {}
      }
    },
    created() {
        //  created = beim erstellen der Seite im DOM
      this.getUserData()
    },
    methods: {
      async getUserData() {
        try {

          // API-Aufruf, um die gesammelten Karten von "username" abzurufen.
          // Wichtig: Funktioniert nur, wenn der Benutzer in der Datenbank existiert, sonst gibt es eine Fehlermeldung.
          // Daher ist es wichtig sicherzustellen, dass sich der Benutzer anmeldet.

            // Axios-Anfrage an die Datenbank für gesammelte Karten.
          const response = await axios.get(this.APIURL, {
            params: {
              username: this.username
            }
          })
            //  Variablen Werte zuweisen
          this.ApiData = response.data
          this.checkApiData = true
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>

<style>
</style>