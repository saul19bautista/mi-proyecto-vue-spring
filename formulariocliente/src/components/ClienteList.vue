<template>
  <div class="tabla-contenedor">
    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-header bg-dark text-white text-center rounded-top-4">
        <h4><i class="bi bi-person-lines-fill me-2"></i>Clientes Registrados</h4>
      </div>

      <div class="card-body p-4">
        <div v-if="clientes.length > 0" class="table-responsive rounded">
          <table class="table table-bordered table-hover table-striped align-middle shadow-sm custom-table">
            <thead class="table-dark text-white">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Codigo Postal</th>
                <th>Activo</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.id" class="transition-shadow hover-shadow">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.nombre }}</td>
                <td>{{ cliente.apellido }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.telefono }}</td>
                <td>{{ cliente.direccion }}</td>
                <td>{{ cliente.ciudad }}</td>
                <td>{{ cliente.estado }}</td>
                <td>{{ cliente.codigoPostal }}</td>
                <td>{{ cliente.activo ? 'Sí' : 'No' }}</td>
                <td class="text-center">
                  <button class="btn btn-sm btn-outline-primary me-2" @click="editarCliente(cliente)">
                    <i class="bi bi-pencil-square"></i> Editar
                  </button>
                  <button class="btn btn-sm btn-outline-danger" @click="eliminarCliente(cliente.id)">
                    <i class="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center text-muted fs-5">
          <i class="bi bi-person-x-fill me-2"></i>No hay clientes registrados.
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de edición -->
  <div class="modal fade" id="modalEditarCliente" tabindex="-1" aria-labelledby="modalEditarClienteLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="modalEditarClienteLabel"><i class="bi bi-pencil-square me-2"></i>Editar Cliente</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="guardarCambiosCliente">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Nombre</label>
                <input v-model="clienteSeleccionado.nombre" type="text" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Apellido</label>
                <input v-model="clienteSeleccionado.apellido" type="text" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Correo</label>
                <input v-model="clienteSeleccionado.email" type="email" class="form-control" required />
              </div>
              <div class="col-md-6">
                <label class="form-label">Teléfono</label>
                <input v-model="clienteSeleccionado.telefono" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Dirección</label>
                <input v-model="clienteSeleccionado.direccion" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Ciudad</label>
                <input v-model="clienteSeleccionado.ciudad" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Estado</label>
                <input v-model="clienteSeleccionado.estado" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Código Postal</label>
                <input v-model="clienteSeleccionado.codigoPostal" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Activo</label>
                <select v-model="clienteSeleccionado.activo" class="form-select">
                  <option :value="true">Sí</option>
                  <option :value="false">No</option>
                </select>
              </div>
            </div>
            <div class="mt-4 text-end">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn btn-success">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const clientes = ref([]);

const clienteSeleccionado = ref({
  nombre: '', apellido: '', email: '', telefono: '',
  direccion: '', ciudad: '', estado: '', codigoPostal: '',
  activo: true,
});

const cargarClientes = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/clientes');
    clientes.value = response.data;
  } catch (error) {
    console.error('Error al cargar clientes:', error);
  }
};

const editarCliente = (cliente) => {
  clienteSeleccionado.value = { ...cliente };
  const modal = new bootstrap.Modal(document.getElementById('modalEditarCliente'));
  modal.show();
};

const guardarCambiosCliente = async () => {
  try {
    await axios.put(`http://localhost:8080/api/clientes/${clienteSeleccionado.value.id}`, clienteSeleccionado.value);
    await cargarClientes();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarCliente'));
    modal.hide();
  } catch (error) {
    console.error('Error al guardar cambios:', error);
  }
};

const eliminarCliente = async (id) => {
  if (confirm('¿Estás seguro de eliminar este cliente?')) {
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${id}`);
      await cargarClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  }
};

onMounted(cargarClientes);
</script>

<style scoped>
.transition-shadow:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.table-responsive {
  overflow-x: auto;
}

.custom-table th,
.custom-table td {
  white-space: nowrap;
  vertical-align: middle;
  padding: 1.5rem; /* Aumento significativo en el padding */
}

.custom-table {
  font-size: 1.25rem; /* Aumento del tamaño de la fuente */
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: #fff;
  min-width: 1400px; /* Aumento del ancho mínimo de la tabla */
}

.card-body {
  background-color: #f8f9fa;
}

th {
  background-color: #343a40;
  color: #fff;
}

.tabla-contenedor {
  max-width: 150%; /* La tabla ocupará todo el ancho disponible */
  width: 120%;
  padding: 2rem;
  margin: 0 auto;
}
</style>
