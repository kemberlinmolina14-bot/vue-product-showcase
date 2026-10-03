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
/* Estilos globales */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Variables para Modo Oscuro */
:root.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

:root.dark-mode #app {
  background-color: #121212;
  color: #e0e0e0;
}

:root.dark-mode .header {
  background-color: #1e1e1e !important;
  border-bottom-color: #333;
}

:root.dark-mode .product-card,
:root.dark-mode .el-card {
  background-color: #1e1e1e !important;
  color: #ffffff !important;
  border-color: #333 !important;
}

:root.dark-mode .product-title,
:root.dark-mode .product-price {
  color: #ffffff !important;
}

:root.dark-mode .theme-toggle-btn {
  color: #ffffff;
  border-color: #555;
}
</style>