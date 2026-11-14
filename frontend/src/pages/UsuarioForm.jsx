import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { obtener, crear, actualizar } from '../services/usuarios';

export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', correo: '', contrasena: '', estado: 'activo' });
  const [cargado, setCargado] = useState(!id);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (id) {
      obtener(id)
        .then(item => {
          setForm({
            nombre: item.nombre,
            correo: item.correo,
            contrasena: '',
            estado: item.estado,
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


    if (id && datos.contrasena === '') {
      delete datos.contrasena;
    }

    try {
      if (id) {
        await actualizar(id, datos);
      } else {
        await crear(datos);
      }
      navigate('/usuarios');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo guardar.');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div>
      <h2>{id ? 'Editar usuario' : 'Crear usuario'}</h2>
      {error && <p className="error" role="alert">{error}</p>}

      {!cargado ? (
        <p>{error ? 'Regresa a la lista e intenta de nuevo.' : 'Cargando...'}</p>
      ) : (
        <form onSubmit={guardar}>
          <label htmlFor="nombre">Nombre</label>
          <input id="nombre" name="nombre" value={form.nombre} onChange={cambiar} required maxLength={191} />

          <label htmlFor="correo">Correo</label>
          <input id="correo" name="correo" type="email" value={form.correo} onChange={cambiar} required maxLength={191} />

          <label htmlFor="contrasena">Contraseña</label>
          <input id="contrasena" name="contrasena" type="password" value={form.contrasena} onChange={cambiar} required={!id} minLength={8} maxLength={128} autoComplete="new-password" />
          <small>{id ? 'Déjala vacía para conservar la actual.' : 'Mínimo 8 caracteres.'}</small>

          <label htmlFor="estado">Estado</label>
          <select id="estado" name="estado" value={form.estado} onChange={cambiar}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <button type="submit" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar'}
          </button>
          <Link to="/usuarios">Cancelar</Link>
        </form>
      )}

      {!cargado && <Link to="/usuarios">Volver a la lista</Link>}
    </div>
  );
}
