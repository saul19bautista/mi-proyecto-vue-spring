<!-- src/views/ClientesView.vue -->
<template>
  <div class="home-container"></div>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-4 mb-4">
        <ClienteForm />
      </div>
      <div class="col-lg-8">
        <ClienteList />
      </div>
    </div>
      <!-- Pie de Página -->
    <footer class="bg-dark text-white text-center py-4 mt-5">
      <p>&copy; 2025 Servicio al Cliente | Todos los derechos reservados.</p>
    </footer>

  </div>
  
  </template>
  
  <script setup>
  import ClienteForm from "../components/ClienteForm.vue";
  import ClienteList from '../components/ClienteList.vue';

  </script>
  