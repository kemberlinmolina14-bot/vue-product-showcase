import axios from 'axios';

export default {
    namespaced: true,
    state: () => ({
        products: [],
        selectedCategory: '',
        loading: false,
        error: null
    }),
    getters: {
        filteredProducts(state) {
            if (!state.selectedCategory) {
                return state.products;
            }
            return state.products.filter(
                (p) => p.category === state.selectedCategory
            );
        }
    },
    actions: {
        async fetchProducts({ commit }) {
            commit('SET_LOADING', true);
            try {
                const response = await axios.get('/products.json');
                commit('SET_PRODUCTS', Array.isArray(response.data) ? response.data : []);
                commit('SET_ERROR', null);
            } catch (error) {
                console.error('Error al obtener productos:', error);
                commit('SET_ERROR', 'Ocurrió un error al obtener el catálogo desde el servidor.');
            } finally {
                commit('SET_LOADING', false);
            }
        }
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products;
        },
        SET_CATEGORY_FILTER(state, category) {
            state.selectedCategory = category;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_ERROR(state, error) {
            state.error = error;
        }
    }
};