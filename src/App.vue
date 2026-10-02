<template>
  <div id="app">
    <Header />
    <main>
      <ProductList />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import ProductList from './components/ProductList.vue';
import Footer from './components/Footer.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>