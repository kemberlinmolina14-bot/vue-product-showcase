import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';
import { createStore } from 'vuex';

describe('ProductCard.vue', () => {
    let store;

    beforeEach(() => {
        store = createStore({
            modules: {
                favorites: {
                    namespaced: true,
                    state: () => ({ items: [] }),
                    actions: { toggleFavorite: jest.fn() }
                }
            }
        });
    });

    it('1. Renderiza correctamente la información del producto', () => {
        const product = {
            id: 1,
            title: 'Polera de Algodón Nova',
            price: 15990,
            image: 'https://via.placeholder.com/150'
        };

        const wrapper = mount(ProductCard, {
            props: { product },
            global: { plugins: [store] }
        });

        expect(wrapper.text()).toContain('Polera de Algodón Nova');
        expect(wrapper.text()).toContain('$15.990');
    });
});