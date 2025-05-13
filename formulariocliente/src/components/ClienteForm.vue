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
              :class="{'form-control': true, 'is-invalid': errores.nombre}"
              placeholder="Juan"
              required
              @blur="validarNombre"
            />
            <div v-if="errores.nombre" class="invalid-feedback">
              {{ errores.nombre }}
            </div>
          </div>

          <div class="col-md-6">
            <label for="apellido" class="form-label">Apellido</label>
            <input
              type="text"
              id="apellido"
              v-model="cliente.apellido"
              :class="{'form-control': true, 'is-invalid': errores.apellido}"
              placeholder="Pérez Gómez"
              required
              @blur="validarApellido"
            />
            <div v-if="errores.apellido" class="invalid-feedback">
              {{ errores.apellido }}
            </div>
          </div>

          <!-- Email y Teléfono -->
          <div class="col-md-6">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              v-model="cliente.email"
              :class="{'form-control': true, 'is-invalid': errores.email}"
              placeholder="juan12@example.com"
              required
              @blur="validarEmail"
            />
            <div v-if="errores.email" class="invalid-feedback">
              {{ errores.email }}
            </div>
          </div>

          <div class="col-md-6">
            <label for="telefono" class="form-label">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              v-model="cliente.telefono"
              :class="{'form-control': true, 'is-invalid': errores.telefono}"
              placeholder="Ej: 9511234567"
              required
              @input="validarTelefono"
            />
            <div v-if="errores.telefono" class="invalid-feedback">
              {{ errores.telefono }}
            </div>
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
              :class="{'form-control': true, 'is-invalid': errores.ciudad}"
              placeholder="Oaxaca"
              required
              @blur="validarCiudad"
            />
            <div v-if="errores.ciudad" class="invalid-feedback">
              {{ errores.ciudad }}
            </div>
          </div>
          <div class="col-md-4">
            <label for="estado" class="form-label">Estado</label>
            <input
              type="text"
              id="estado"
              v-model="cliente.estado"
              :class="{'form-control': true, 'is-invalid': errores.estado}"
              placeholder="Oaxaca"
              required
              @blur="validarEstado"
            />
            <div v-if="errores.estado" class="invalid-feedback">
              {{ errores.estado }}
            </div>
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
      errores: {
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        ciudad: "",
        estado: "",
      },
    };
  },
  methods: {
    async submitForm() {
      // Validamos todos los campos antes de enviar
      if (!this.validarNombre() || !this.validarApellido() || !this.validarEmail() || !this.validarTelefono() || !this.validarCiudad() || !this.validarEstado()) {
        return;
      }

      try {
        const response = await crearCliente(this.cliente);
        alert("Cliente guardado con éxito.");
        this.resetForm();
      } catch (error) {
        console.error("Error:", error);
        alert("Ocurrió un error al guardar el cliente.");
      }
    },

    // Validación del Nombre
    validarNombre() {
      const nombreRegex = /^[A-ZÁÉÍÓÚ][a-záéíóú]+$/;
      if (!nombreRegex.test(this.cliente.nombre)) {
        this.errores.nombre = "El nombre debe comenzar con mayúscula y no puede contener caracteres especiales.";
        return false;
      } else {
        this.errores.nombre = "";
        return true;
      }
    },

    // Validación del Apellido (permitir dos apellidos)
    validarApellido() {
      const apellidoRegex = /^[A-ZÁÉÍÓÚ][a-záéíóú]+(\s[A-ZÁÉÍÓÚ][a-záéíóú]+)?$/;
      if (!apellidoRegex.test(this.cliente.apellido)) {
        this.errores.apellido = "El apellido debe comenzar con mayúscula y no puede contener caracteres especiales. Puede contener dos apellidos.";
        return false;
      } else {
        this.errores.apellido = "";
        return true;
      }
    },

    // Validación del Correo Electrónico
    validarEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com)$/;
      if (!emailRegex.test(this.cliente.email)) {
        this.errores.email = "El correo debe ser de un dominio válido (gmail, hotmail, outlook).";
        return false;
      } else {
        this.errores.email = "";
        return true;
      }
    },

    // Validación del Teléfono
    validarTelefono() {
      const telefonoRegex = /^\d{10}$/;
      if (!telefonoRegex.test(this.cliente.telefono)) {
        this.errores.telefono = "Teléfono inválido. Debe contener exactamente 10 dígitos numéricos.";
        return false;
      } else {
        this.errores.telefono = "";
        return true;
      }
    },

    // Validación de la Ciudad
    validarCiudad() {
      const ciudadRegex = /^[A-Za-z\s]+$/;
      if (!ciudadRegex.test(this.cliente.ciudad)) {
        this.errores.ciudad = "La ciudad no puede contener números ni caracteres especiales.";
        return false;
      } else {
        this.errores.ciudad = "";
        return true;
      }
    },

    // Validación del Estado
    validarEstado() {
      const estadoRegex = /^[A-Za-z\s]+$/;
      if (!estadoRegex.test(this.cliente.estado)) {
        this.errores.estado = "El estado no puede contener números ni caracteres especiales.";
        return false;
      } else {
        this.errores.estado = "";
        return true;
      }
    },

    // Restablecer el formulario
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
      this.errores = {
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        ciudad: "",
        estado: "",
      };
    },
  },
};
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
