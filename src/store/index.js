import { createStore } from 'vuex';
import products from './modules/products';
import filters from './modules/filters';
import favorites from './modules/favorites';

export default createStore({
    modules: {
        products,
        filters,
        favorites,
    },
    getters: {
        // Getter global para cruzar el estado de productos con el filtro activo
        filteredProducts: (state, getters) => {
            const allProducts = getters['products/allProducts'];
            const selectedCategory = getters['filters/selectedCategory'];

            if (!selectedCategory) {
                return allProducts;
            }
            return allProducts.filter((product) => product.category === selectedCategory);
        },
    },
});