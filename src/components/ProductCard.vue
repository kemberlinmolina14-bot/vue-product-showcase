<template>
    <el-card class="product-card" :body-style="{ padding: '15px' }">
        <div class="image-wrapper">
            <img :src="product.image" :alt="product.title" class="product-image" @error="handleImageError" />
        </div>
        <div class="product-info">
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-price">{{ formattedPrice }}</p>
            <el-button type="danger" plain size="small" @click="toggleFavorite">
                ♥ {{ isFavorite ? 'En Favoritos' : 'Agregar a Favoritos' }}
            </el-button>
        </div>
    </el-card>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const store = useStore();

const isFavorite = computed(() => {
    return store.state.favorites?.items?.some(item => item.id === props.product.id) || false;
});

const formattedPrice = computed(() => {
    return `$${props.product.price.toLocaleString('es-CL')}`;
});

const toggleFavorite = () => {
    store.dispatch('favorites/toggleFavorite', props.product);
};

const handleImageError = (e) => {
    // Imagen de respaldo local o SVG liviano si la red falla
    e.target.src = 'https://via.placeholder.com/200x200?text=Producto';
};
</script>

<style scoped>
.product-card {
    margin-bottom: 20px;
    border-radius: 8px;
}

.image-wrapper {
    text-align: center;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    border-radius: 4px;
    overflow: hidden;
}

.product-image {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.product-title {
    font-size: 1rem;
    margin: 10px 0 5px;
}

.product-price {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
}
</style>