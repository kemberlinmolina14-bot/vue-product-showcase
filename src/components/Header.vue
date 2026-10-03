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

    <div class="header-actions">
      <div class="favorites-badge">
        <span>♥ Favoritos: {{ favoriteCount }}</span>
      </div>

      <!-- Botón de Modo Oscuro -->
      <button class="theme-toggle-btn" @click="toggleDarkMode">
        {{ isDarkMode ? '☀️ Claro' : '🌙 Oscuro' }}
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const selectedCategory = ref('');
const isDarkMode = ref(false);

const favoriteCount = computed(() => {
  return store.state.favorites?.items?.length || 0;
});

const onCategoryChange = () => {
  store.commit('products/SET_CATEGORY_FILTER', selectedCategory.value);
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark-mode', isDarkMode.value);
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--bg-header, #f8f9fa);
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.3s;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.filter-container select {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.theme-toggle-btn {
  background: transparent;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>