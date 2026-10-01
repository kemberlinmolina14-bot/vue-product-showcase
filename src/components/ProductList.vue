<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import ProductCard from './ProductCard.vue';

const store = useStore();

// Getters mapeados desde Vuex
const products = computed(() => store.getters.filteredProducts);
const categories = computed(() => store.getters['products/categories']);
const isLoading = computed(() => store.getters['products/isLoading']);
const errorMessage = computed(() => store.getters['products/errorMessage']);

const selectedCategory = computed({
    get: () => store.getters['filters/selectedCategory'],
    set: (val) => store.dispatch('filters/updateCategory', val),
});

const categoryTranslations = {
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer"
};

const retryFetch = () => {
    store.dispatch('products/fetchProducts');
};

onMounted(() => {
    if (store.getters['products/allProducts'].length === 0) {
        store.dispatch('products/fetchProducts');
    }
});
</script>

<template>
    <section class="product-list-section">
        <div class="header-actions">
            <h2>Catálogo de Productos</h2>

            <div class="filter-group" v-if="!isLoading && !errorMessage">
                <label for="category-select">Filtrar por categoría:</label>
                <select id="category-select" v-model="selectedCategory">
                    <option value="">Todas las categorías</option>
                    <option v-for="cat in categories" :key="cat" :value="cat">
                        {{ categoryTranslations[cat] || cat }}
                    </option>
                </select>
            </div>
        </div>

        <div v-if="isLoading" class="status-message loading">
            <div class="spinner"></div>
            <p>Cargando catálogo desde el Store...</p>
        </div>

        <div v-else-if="errorMessage" class="status-message error">
            <p>⚠️ {{ errorMessage }}</p>
            <button @click="retryFetch" class="retry-btn">Reintentar</button>
        </div>

        <div v-else-if="products.length === 0" class="status-message empty">
            <p>🔍 No se encontraron productos en esta categoría.</p>
        </div>

        <div v-else class="product-grid">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
    </section>
</template>

<style scoped>
.product-list-section {
    padding: 1.5rem 0;
}

.header-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.header-actions h2 {
    color: #1e293b;
    margin: 0;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.filter-group label {
    font-weight: 500;
    font-size: 0.9rem;
    color: #475569;
}

.filter-group select {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    background-color: #ffffff;
    font-size: 0.9rem;
    color: #334155;
    outline: none;
    cursor: pointer;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
}

.status-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    text-align: center;
    color: #64748b;
}

.status-message.error {
    color: #dc2626;
    border-color: #fecaca;
    background-color: #fef2f2;
}

.retry-btn {
    margin-top: 1rem;
    padding: 0.5rem 1.25rem;
    background-color: #dc2626;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>