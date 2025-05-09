<template>
  <div class="home-container">
    <!-- Barra de menú horizontal -->
    <div class="navbar">
      <div class="navbar-logo">
        <h3>Servicio al Cliente</h3>
      </div>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <i class="fas fa-home"></i> Inicio
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/clientes" class="nav-link">
            <i class="fas fa-users"></i> Clientes
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/soporte" class="nav-link">
            <i class="fas fa-headset"></i> Soporte
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contacto" class="nav-link">
            <i class="fas fa-envelope"></i> Contacto
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Contenido principal -->
    <div class="content">
      <router-view>
        <template #default>
          <!-- Mensaje de servicio al cliente por defecto -->
          <div class="welcome-message">
            <h2>Bienvenido a Nuestro Servicio de Atención al Cliente</h2>
            <p>Estamos encantados de tenerlo con nosotros. Nuestro equipo está aquí para ayudarte con cualquier duda o solicitud.</p>
          </div>

          <!-- Tarjetas informativas -->
          <div class="info-cards">
            <div class="card">
              <h3>Soporte Técnico</h3>
              <p>¿Tienes problemas con nuestro servicio? Contáctanos y resolveremos tus dudas.</p>
            </div>
            <div class="card">
              <h3>Clientes VIP</h3>
              <p>Accede a contenido exclusivo y a beneficios especiales como cliente VIP.</p>
            </div>
            <div class="card">
              <h3>Contacto Rápido</h3>
              <p>Para una respuesta rápida, usa nuestros canales de atención directa.</p>
            </div>
          </div>
        </template>
      </router-view>
    </div>
      <!-- Pie de Página -->
    <footer class="bg-dark text-white text-center py-4 mt-5">
      <p>&copy; 2025 Servicio al Cliente | Todos los derechos reservados.</p>
    </footer>

  </div>
  
</template>

<script setup>
// Lógica si es necesario
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2c3e50;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.navbar-logo h3 {
  margin: 0;
  font-size: 24px;
  color: #f1c40f;
}

.nav {
  list-style-type: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #b0b0b0;
  text-decoration: none;
  font-size: 16px;
  padding: 10px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.nav-link:hover {
  color: white;
  background-color: #34495e;
  border-radius: 5px;
}

.nav-link i {
  margin-right: 8px;
  font-size: 18px;
}

.content {
  padding: 20px;
  background-color: #ecf0f1;
  width: 100%;
  height: calc(150vh - 10px);
  overflow-y: auto;
}

.welcome-message {
  background: linear-gradient(145deg, #6e7dff, #5560ea);
  padding: 20px;
  color: white;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;
}

.welcome-message h2 {
  font-size: 2rem;
  margin: 0;
}

.welcome-message p {
  font-size: 1.1rem;
}

.info-cards {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 30%;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.card p {
  color: #7f8c8d;
}
</style>
