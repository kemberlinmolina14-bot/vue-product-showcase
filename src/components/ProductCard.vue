<template>
    <el-card class="product-card" :body-style="{ padding: '15px' }" shadow="hover">
        <div class="image-container">
            <img :src="product.image" :alt="product.title" class="product-image" />
        </div>

        <div class="product-info">
            <el-tag size="small" type="info" class="category-tag">
                {{ product.category }}
            </el-tag>

            <h3 class="product-title" :title="product.title">{{ product.title }}</h3>

            <div class="rating-container" v-if="product.rating">
                <el-rate v-model="product.rating.rate" disabled show-score text-color="#ff9900"
                    score-template="{value}" />
            </div>

            <div class="card-footer">
                <span class="product-price">{{ formattedPrice }}</span>
                <el-button :type="isFavorite ? 'danger' : 'default'" :icon="isFavorite ? 'StarFilled' : 'Star'" circle
                    class="favorite-btn" @click="toggleFavorite" />
            </div>
        </div>
    </el-card>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const store = useStore();

const isFavorite = computed(() =>
    store.getters['favorites/isFavorite'](props.product.id)
);

// Formateo de precio en formato peso chileno
const formattedPrice = computed(() => {
    const priceCLP = Math.round(props.product.price * 950);
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0,
    }).format(priceCLP);
});

const toggleFavorite = () => {
    store.dispatch('favorites/toggleFavorite', props.product);
};
</script>

<style scoped>
.product-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
}

.product-card:hover {
    transform: translateY(-5px);
}

.image-container {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.product-image {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
}

.product-title {
    font-size: 1rem;
    margin: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}

.product-price {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--el-color-primary);
}
</style>