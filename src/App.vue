<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ProductList from './components/ProductList.vue';
</script>

<template>
  <div id="app-layout">
    <Header />
    <main class="main-content">
      <div class="container">
        <ProductList />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f8fafc;
  color: #334155;
}

#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>