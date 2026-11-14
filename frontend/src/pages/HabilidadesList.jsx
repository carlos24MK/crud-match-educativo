import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listar, eliminar } from '../services/habilidades';

export default function HabilidadesList() {
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

      setItems(items.filter(item => item.id_habilidad !== id));
      setError('');
    } catch {
      setError('No se pudo eliminar el registro.');
    }
  }

  if (cargando) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Habilidades</h2>
      <Link to="/habilidades/nuevo">Crear habilidad</Link>
      {error && <p className="error" role="alert">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id_habilidad}>
              <td>{item.id_habilidad}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>
                <Link to={`/habilidades/${item.id_habilidad}/editar`}>Editar</Link>
                <button onClick={() => borrar(item.id_habilidad)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && !error && <p>No hay registros.</p>}
    </div>
  );
}
