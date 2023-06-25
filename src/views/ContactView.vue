<template>
  <div class="login-container">
    <h2 id="ContactFont" style="color: white; text-align: center; text-shadow: 2px 2px #000000">
      Statistiken der letzten Packs (wird beim Refresh zurückgesetzt)
    </h2>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default {
  name: 'Login_Component',
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      const data = this.generateData();

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Pseudowerte',
            data: data.values,
            backgroundColor: 'white', // Change the background color to white
            borderColor: 'white', // Change the border color to white
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              beginAtZero: false,
              min: -200,
              max: 200
            }
          },
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: 'black',
              font: {
                weight: 'bold'
              },
              formatter: (value) => value.toFixed(2)
            }
          }
        },
        plugins: [ChartDataLabels]
      });
    },
    generateData() {
      const labels = [];
      const values = [];

      for (let i = 0; i < 10; i++) {
        labels.push(`Wert ${i + 1}`);
        values.push(Math.floor(Math.random() * 401) - 200);
      }

      return {
        labels,
        values
      };
    }
  }
}
</script>

<style scoped>
.login-container {
  height: 800px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  backdrop-filter: blur(1px);
  background-color: rgba(250, 250, 250, 0.051);
}

#ContactFont {
  color: white;
  text-align: center;
  text-shadow: 2px 2px #000000;
}
</style>
