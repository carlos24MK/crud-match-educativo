import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listar, eliminar } from '../services/usuarios';

export default function UsuariosList() {
  const [items, setItems] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    listar()
      .then(setItems)
      .catch(() => setError('No se pudo cargar la lista. Revisa el backend.'))
      .finally(() => setCargando(false));
  }, []);

  async function borrar(id) {
    if (!window.confirm('¿Eliminar este registro?')) return;

    try {
      await eliminar(id);

      setItems(items.filter(item => item.id_usuario !== id));
      setError('');
    } catch {
      setError('No se pudo eliminar el registro.');
    }
  }

  if (cargando) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Usuarios</h2>
      <Link to="/usuarios/nuevo">Crear usuario</Link>
      {error && <p className="error" role="alert">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id_usuario}>
              <td>{item.id_usuario}</td>
              <td>{item.nombre}</td>
              <td>{item.correo}</td>
              <td>{item.estado}</td>
              <td>
                <Link to={`/usuarios/${item.id_usuario}/editar`}>Editar</Link>
                <button onClick={() => borrar(item.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && !error && <p>No hay registros.</p>}
    </div>
  );
}
