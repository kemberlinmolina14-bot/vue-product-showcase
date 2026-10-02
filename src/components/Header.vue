<template>
  <header class="header">
    <div class="logo">
      <h2>Catálogo de Productos</h2>
    </div>

    <div class="filter-container">
      <label for="category-select">Categoría: </label>
      <select id="category-select" v-model="selectedCategory" @change="onCategoryChange">
        <option value="">Todas las categorías</option>
        <option value="men's clothing">Ropa de Hombre</option>
        <option value="jewelery">Joyería</option>
        <option value="electronics">Electrónica</option>
      </select>
    </div>

    <div class="favorites-badge">
      <span>♥ Favoritos: {{ favoriteCount }}</span>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const selectedCategory = ref('');

const favoriteCount = computed(() => {
  return store.state.favorites?.items?.length || 0;
});

const onCategoryChange = () => {
  store.commit('products/SET_CATEGORY_FILTER', selectedCategory.value);
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.filter-container select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>