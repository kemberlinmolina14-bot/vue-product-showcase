import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard.vue';
import { createStore } from 'vuex';

describe('ProductCard.vue', () => {
    let store;
    let mockFavoritesModule;

    const sampleProduct = {
        id: 1,
        title: 'Polera de Algodón Nova',
        price: 15000,
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
    };

    beforeEach(() => {
        mockFavoritesModule = {
            namespaced: true,
            getters: {
                isFavorite: () => () => false
            },
            actions: {
                toggleFavorite: jest.fn()
            }
        };

        store = createStore({
            modules: {
                favorites: mockFavoritesModule
            }
        });
    });

    test('renderiza correctamente el título y el precio formateado del producto', () => {
        const wrapper = mount(ProductCard, {
            props: { product: sampleProduct },
            global: { plugins: [store] }
        });

        // Verificar que el título esté en el HTML
        expect(wrapper.find('.title').text()).toBe('Polera de Algodón Nova');

        // Verificar que el precio esté formateado en CLP
        expect(wrapper.find('.price').text()).toContain('15.000');
    });

    test('emite o llama a la acción toggleFavorite al hacer clic en el botón de favoritos', async () => {
        const wrapper = mount(ProductCard, {
            props: { product: sampleProduct },
            global: { plugins: [store] }
        });

        const favButton = wrapper.find('.favorite-btn');
        await favButton.trigger('click');

        expect(mockFavoritesModule.actions.toggleFavorite).toHaveBeenCalled();
    });
});