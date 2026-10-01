import axios from 'axios';

export default {
    namespaced: true,
    state: () => ({
        items: [],
        isLoading: false,
        errorMessage: '',
    }),
    mutations: {
        SET_LOADING(state, status) {
            state.isLoading = status;
        },
        SET_PRODUCTS(state, products) {
            state.items = products;
        },
        SET_ERROR(state, message) {
            state.errorMessage = message;
        },
    },
    actions: {
        async fetchProducts({ commit }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', '');

            try {
                const response = await axios.get('https://fakestoreapi.com/products');

                // Adaptamos el precio a Peso Chileno (CLP)
                const formattedProducts = response.data.map((prod) => ({
                    ...prod,
                    price: Math.round(prod.price * 950),
                }));

                commit('SET_PRODUCTS', formattedProducts);
            } catch (error) {
                console.error('Error en Vuex fetchProducts:', error);
                commit('SET_ERROR', 'Ocurrió un error al obtener el catálogo desde el servidor.');
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
    getters: {
        allProducts: (state) => state.items,
        isLoading: (state) => state.isLoading,
        errorMessage: (state) => state.errorMessage,
        // Extraer categorías dinámicas únicas
        categories: (state) => {
            const cats = state.items.map((item) => item.category);
            return [...new Set(cats)];
        },
    },
};