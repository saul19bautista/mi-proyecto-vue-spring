<template>
  <div class="container my-5">
    <div class="card border-0 shadow-sm rounded-4">
      <div class="card-header bg-primary text-white text-center">
        <h4 class="mb-0">
          <i class="bi bi-person-lines-fill me-2"></i>
          Formulario de Cliente
        </h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="submitForm" class="row g-3">

          <!-- Nombre y Apellido -->
          <div class="col-md-6">
            <label for="nombre" class="form-label">Nombre</label>
            <input
              type="text"
              id="nombre"
              v-model="cliente.nombre"
              class="form-control"
              placeholder="Juan"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="apellido" class="form-label">Apellido</label>
            <input
              type="text"
              id="apellido"
              v-model="cliente.apellido"
              class="form-control"
              placeholder="Pérez Gómez"
              required
            />
          </div>

          <!-- Email y Teléfono -->
          <div class="col-md-6">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              v-model="cliente.email"
              class="form-control"
              placeholder="juan12@example.com"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="telefono" class="form-label">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              v-model="cliente.telefono"
              class="form-control"
              placeholder="+52 951 123 4567"
              required
            />
          </div>

          <!-- Dirección -->
          <div class="col-12">
            <label for="direccion" class="form-label">Dirección</label>
            <input
              type="text"
              id="direccion"
              v-model="cliente.direccion"
              class="form-control"
              placeholder="Av. de la Libertad, 123"
              required
            />
          </div>

          <!-- Ciudad, Estado, Código Postal -->
          <div class="col-md-4">
            <label for="ciudad" class="form-label">Ciudad</label>
            <input
              type="text"
              id="ciudad"
              v-model="cliente.ciudad"
              class="form-control"
              placeholder="Oaxaca"
              required
            />
          </div>
          <div class="col-md-4">
            <label for="estado" class="form-label">Estado</label>
            <input
              type="text"
              id="estado"
              v-model="cliente.estado"
              class="form-control"
              placeholder="Oaxaca"
              required
            />
          </div>
          <div class="col-md-4">
            <label for="codigoPostal" class="form-label">Código Postal</label>
            <input
              type="text"
              id="codigoPostal"
              v-model="cliente.codigoPostal"
              class="form-control"
              placeholder="68000"
              required
            />
          </div>

          <!-- Cliente Activo -->
          <div class="col-12">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="activo"
                v-model="cliente.activo"
              />
              <label class="form-check-label" for="activo">
                Cliente Activo
              </label>
            </div>
          </div>

          <!-- Botón -->
          <div class="col-12 text-end">
            <button type="submit" class="btn btn-primary">
              <i class="bi bi-save me-1"></i> Guardar Cliente
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { crearCliente } from "@/services/clienteServices";

export default {
  data() {
    return {
      cliente: {
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        estado: "",
        codigoPostal: "",
        activo: true,
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await crearCliente(this.cliente);
        alert("Cliente guardado con éxito.");
        this.resetForm();
      } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error al guardar el cliente.");
      }
    },
    resetForm() {
      this.cliente = {
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        estado: "",
        codigoPostal: "",
        activo: true,
      };
    },
  },
};
</script>

