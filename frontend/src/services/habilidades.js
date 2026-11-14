import api from '../api/axios';
export const listar = () => api.get('/habilidades').then(r => r.data);
export const obtener = id => api.get(`/habilidades/${id}`).then(r => r.data);
export const crear = datos => api.post('/habilidades', datos).then(r => r.data);
export const actualizar = (id, datos) => api.put(`/habilidades/${id}`, datos).then(r => r.data);
export const eliminar = id => api.delete(`/habilidades/${id}`);
