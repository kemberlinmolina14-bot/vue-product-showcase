import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Importar Element Plus y sus estilos
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'; // Estilos para modo oscuro
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

// Registrar iconos de Element Plus
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(store);
app.use(ElementPlus);
app.mount('#app');