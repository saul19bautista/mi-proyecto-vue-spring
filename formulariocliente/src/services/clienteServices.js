import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clientes';

export const crearCliente = (clientes) => {
  return axios.post(API_URL, clientes,);
};
/*export const eliminarEmpleado = async (id) => {
  await axios.delete(`http://localhost:8080/api/empleados/${id}`);
};*/