# CRUD de Match Educativo

Ejercicio de clase con dos entidades: Usuarios y Habilidades. Cada entidad permite listar, crear, editar y eliminar registros.

## Backend Laravel

En PowerShell, desde la raíz del repositorio:

```powershell
cd backend
composer install
Copy-Item .env.example .env
php artisan key:generate
New-Item -ItemType File database/database.sqlite
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

La configuración de ejemplo usa SQLite. Para usar MySQL con WampServer, configura las variables de base de datos en el archivo local `.env` antes de migrar.

## Frontend React

Abre otra terminal en la raíz del repositorio:

```powershell
cd frontend
Copy-Item .env.example .env
npm.cmd ci
npm.cmd run dev
```

Abre http://127.0.0.1:5173. La API responde en los endpoints `/api/usuarios` y `/api/habilidades` del puerto 8000. Esta práctica usa el CRUD local sin autenticación.
