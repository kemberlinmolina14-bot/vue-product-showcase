import { mount } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';
import { createStore } from 'vuex';

describe('ProductList.vue - Manejo de Errores', () => {
    test('muestra el mensaje de error visual cuando la API falla', () => {
        const store = createStore({
            getters: {
                filteredProducts: () => []
            },
            modules: {
                products: {
                    namespaced: true,
                    getters: {
                        allProducts: () => [],
                        categories: () => [],
                        isLoading: () => false,
                        errorMessage: () => 'Ocurrió un error al obtener el catálogo desde el servidor.'
                    },
                    actions: {
                        fetchProducts: jest.fn()
                    }
                },
                filters: {
                    namespaced: true,
                    getters: {
                        selectedCategory: () => ''
                    }
                }
            }
        });

        const wrapper = mount(ProductList, {
            global: { plugins: [store] }
        });

        // Verificar que el mensaje de error se muestre en pantalla
        const errorContainer = wrapper.find('.status-message.error');
        expect(errorContainer.exists()).toBe(true);
        expect(errorContainer.text()).toContain('Ocurrió un error al obtener el catálogo desde el servidor.');

        // Verificar presencia del botón de reintento
        const retryBtn = wrapper.find('.retry-btn');
        expect(retryBtn.exists()).toBe(true);
    });
});

