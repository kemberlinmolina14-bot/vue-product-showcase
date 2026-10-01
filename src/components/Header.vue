<template>
  <div class="header-actions">
    <!-- Selector de Tema Claro / Oscuro -->
    <el-switch
      v-model="isDark"
      active-icon="Moon"
      inactive-icon="Sunny"
      inline-prompt
      @change="toggleDarkMode"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDark = ref(document.documentElement.classList.contains('dark'));

const toggleDarkMode = (val) => {
  const html = document.documentElement;
  if (val) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
};
</script>