import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { obtener, crear, actualizar } from '../services/habilidades';

export default function HabilidadForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', descripcion: '' });
  const [cargado, setCargado] = useState(!id);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (id) {
      obtener(id)
        .then(item => {
          setForm({
            nombre: item.nombre,
            descripcion: item.descripcion ?? '',
          });
          setCargado(true);
        })
        .catch(() => setError('No se pudo cargar el registro.'));
    }
  }, [id]);

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function guardar(e) {
    e.preventDefault();
    setError('');
    setGuardando(true);
    const datos = { ...form };

    try {
      if (id) {
        await actualizar(id, datos);
      } else {
        await crear(datos);
      }
      navigate('/habilidades');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div>
      <h2>{id ? 'Editar habilidad' : 'Crear habilidad'}</h2>
      {error && <p className="error" role="alert">{error}</p>}

      {!cargado ? (
        <p>{error ? 'Regresa a la lista e intenta de nuevo.' : 'Cargando...'}</p>
      ) : (
        <form onSubmit={guardar}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={form.nombre} onChange={cambiar} required maxLength={100} />

          <label htmlFor="descripcion">Descripción</label>
          <textarea id="descripcion" name="descripcion" value={form.descripcion} onChange={cambiar} rows={4} maxLength={5000} />

          <button type="submit" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar'}
          </button>
          <Link to="/habilidades">Cancelar</Link>
        </form>
      )}

      {!cargado && <Link to="/habilidades">Volver a la lista</Link>}
    </div>
  );
}
