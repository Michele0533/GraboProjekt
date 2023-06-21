<template>
  <div>
    <header>
      <nav style="display: flex; justify-content: space-between; align-items: center;">
        <div class="logo">
          PokeCardSimulator
        </div>
        <div class="nav-links">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/statistic">Statistic</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {}
</script>

<style scoped>
.logo {
  font-family: Arial, sans-serif;
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  padding-left: 10px;
  padding-top: 20px;
  /* Weitere CSS-Eigenschaften für die Gestaltung des Logos */
}

.nav-links {
  padding-right: 100px; /* Füge 10 Pixel Abstand nach rechts hinzu */
}

/* ... vorhandene Styles ... */

nav a:not(:last-of-type)::after {
  content: "|";
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>