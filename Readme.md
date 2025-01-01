# Notes App - Full Stack Implementation Exercise

Esta es una aplicación web que te permite gestionar tus notas de manera eficiente. Puedes crear, editar, archivar y filtrar tus notas según tus necesidades. La implementación está dividida en dos fases: creación de notas y aplicación de categorías con filtrado.

## Características

### Fase 1: Creación de Notas

- **Crear, Editar y Eliminar Notas:** Puedes crear nuevas notas, editar su contenido y eliminarlas según sea necesario.
- **Crear, Editar y Eliminar Categorías de Notas:** Puedes crear nuevas categorías, editarlas y eliminarlas según tus necesidades.
- **Archivar/Desarchivar Notas:** Organiza tus ideas archivando y desarchivando notas para mantener un espacio limpio.
- **Listado de Notas:** Visualiza fácilmente tus notas activas y archivadas para un acceso rápido.

### Fase 2: Aplicación de Categorías y Filtrado

- **Categorías de Notas:** Añade categorías a tus notas para una organización avanzada.
- **Filtrado por Categorías:** Filtra tus notas por las categorías asignadas para encontrar información específica de manera sencilla.

## Funcionalidades Adicionales

- **Inicio de Sesión:** Accede de forma segura a la aplicación con una pantalla de login.
- **Renderizado del Lado del Servidor (SSR):** Implementado para un renderizado inicial más eficiente.

## Tecnologías Utilizadas

- **Frontend:** Angular v17, Bootstrap v5.3.2, Axios, NgBootstrap, RxJS, TypeScript.
- **Backend:** Node.js con Express, Bcrypt, Cookie-parser, Cors, Dotenv, Express-session, MySQL con Sequelize ORM.
- **SSR:** Implementado para un renderizado inicial más rápido.

## Configuración y Ejecución de la Aplicación

### Opción 1: Usar los Scripts Automáticos

1. **Clonar el Repositorio:**

```bash
git clone https://github.com/your-username/your-repo.git
```

2. **Completar las Variables de Configuración:**

   Si usas el archivo `script.sh` (Linux/macOS) o `script.bat` (Windows), edítalo para configurar las variables de la base de datos:
   - `MYSQL_USER`: Tu usuario de MySQL.
   - `MYSQL_DATABASE`: El nombre de la base de datos.
   - `MYSQL_PASSWORD`: Tu contraseña de MySQL.

   Por ejemplo, para `script.bat`:

```bat
set MYSQL_USER=root
set MYSQL_DATABASE=notas_challenge
set MYSQL_PASSWORD=tu_contraseña
```

3. **Ejecutar el Script:**

   - Linux/macOS:

```bash
sh script.sh
```

- Windows:

```cmd
script.bat
```

4. **Acceder a la Aplicación:** La aplicación estará disponible en tu navegador en `http://localhost:4200`.

### Opción 2: Configuración Manual con .env

1. **Configurar el Backend:**

   Navega a la carpeta del backend:

```bash
cd backend
```

   Crea un archivo `.env` en la carpeta backend y añade las siguientes variables:

```env
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=notas_challenge
DB_PORT=3306
```

2. **Instalar Dependencias:**

```bash
npm install
```

3. **Ejecutar Migraciones:**

```bash
npx sequelize-cli db:migrate
```

4. **Configurar el Frontend:**

   Navega a la carpeta del frontend:

```bash
cd ../frontend
```

   Instala las dependencias:

```bash
npm install
```

5. **Iniciar la Aplicación:**

   Inicia el backend:

```bash
npm start
```

   En otra terminal, inicia el frontend:

```bash
cd frontend
npm start
```

6. **Acceder a la Aplicación:** Abre tu navegador y dirígete a `http://localhost:4200`.

## Versión Desplegada

Consulta la versión en línea en <https://app-notes-client.vercel.app/#/home>

## Reconocimientos

Este proyecto fue creado por **Marina Lucero**.
