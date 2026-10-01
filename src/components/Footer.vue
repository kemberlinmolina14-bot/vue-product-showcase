<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="app-footer">
        <div class="container">
            <p>&copy; {{ currentYear }} E-commerce Dept. Todos los derechos reservados.</p>
        </div>
    </footer>
</template>

<style scoped>
.app-footer {
    background-color: #0f172a;
    color: #94a3b8;
    text-align: center;
    padding: 1rem 0;
    margin-top: 2rem;
    font-size: 0.9rem;
}
</style>