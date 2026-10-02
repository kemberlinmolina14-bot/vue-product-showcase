<template>
    <div class="product-list-container">
        <div v-if="loading" class="loading-state">
            <p>Cargando productos...</p>
        </div>

        <!-- Muestra el mensaje de error si la API falla -->
        <div v-else-if="error" class="error-state">
            <p>{{ error }}</p>
        </div>

        <div v-else-if="products.length > 0" class="products-grid">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>

        <div v-else class="empty-state">
            <p>No se encontraron productos disponibles.</p>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

const store = useStore();

const products = computed(() => store.getters['products/filteredProducts'] || []);
const loading = computed(() => store.state.products.loading);
const error = computed(() => store.state.products.error);

onMounted(() => {
    store.dispatch('products/fetchProducts');
});
</script>

<style scoped>
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.loading-state,
.empty-state,
.error-state {
    text-align: center;
    padding: 40px;
}

.error-state {
    color: #d9534f;
}
</style>