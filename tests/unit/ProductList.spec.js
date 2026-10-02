import { mount } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';
import { createStore } from 'vuex';

describe('ProductList.vue', () => {
    it('2. Muestra mensaje visual de error cuando la API falla', () => {
        const store = createStore({
            modules: {
                products: {
                    namespaced: true,
                    state: () => ({
                        products: [],
                        loading: false,
                        error: 'Ocurrió un error al obtener el catálogo desde el servidor.'
                    }),
                    getters: {
                        filteredProducts: () => []
                    },
                    actions: {
                        fetchProducts: jest.fn()
                    }
                }
            }
        });

        const wrapper = mount(ProductList, {
            global: { plugins: [store] }
        });

        expect(wrapper.text()).toContain('Ocurrió un error al obtener el catálogo');
    });
});