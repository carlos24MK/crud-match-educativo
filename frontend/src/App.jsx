import { Link, Navigate, Route, Routes } from 'react-router-dom';
import UsuariosList from './pages/UsuariosList';
import UsuarioForm from './pages/UsuarioForm';
import HabilidadesList from './pages/HabilidadesList';
import HabilidadForm from './pages/HabilidadForm';

export default function App() {
  return (
    <>
      <h1>Match Educativo</h1>
      <nav>
        <Link to="/usuarios">Usuarios</Link>
        <Link to="/habilidades">Habilidades</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/usuarios" replace />} />
        <Route path="/usuarios" element={<UsuariosList />} />
        <Route path="/usuarios/nuevo" element={<UsuarioForm />} />
        <Route path="/usuarios/:id/editar" element={<UsuarioForm />} />
        <Route path="/habilidades" element={<HabilidadesList />} />
        <Route path="/habilidades/nuevo" element={<HabilidadForm />} />
        <Route path="/habilidades/:id/editar" element={<HabilidadForm />} />
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </>
  );
}
