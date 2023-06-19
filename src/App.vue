<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <nav style="display: Flex ; justify-content:center;">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/statistic">Statistic</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* ... existing styles ... */

nav a:not(:last-of-type)::after {
  content: "|";
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
