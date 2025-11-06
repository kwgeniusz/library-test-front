# Sistema de Gestión de Biblioteca - Frontend

Aplicación frontend desarrollada con Vue 2 y Vuetify 2 para gestionar libros, autores y categorías de una biblioteca.

## 🚀 Características

- **Gestión de Libros**
  - Listar todos los libros con información de autor y categoría
  - Crear, editar y eliminar libros
  - Buscar libros por título
  - Filtrar libros por autor o categoría
  
- **Gestión de Autores**
  - Listar todos los autores
  - Crear, editar y eliminar autores
  - Buscar autores por nombre o nacionalidad
  - Selección de nacionalidad desde lista predefinida
  
- **Gestión de Categorías**
  - Listar todas las categorías
  - Crear, editar y eliminar categorías
  - Buscar categorías por nombre

- **Características Adicionales**
  - Validación de formularios
  - Alertas de éxito/error
  - Diseño responsive
  - Interfaz Material Design con Vuetify
  - Manejo de errores detallado

## 📋 Requisitos

- Node.js >= 14.x
- npm o pnpm >= 6.x
- API Backend ejecutándose en http://127.0.0.1:8001

## 🔧 Instalación

1. Instalar dependencias:
```bash
pnpm install
# o
npm install
```

2. Asegurarse de que la API backend esté ejecutándose en `http://127.0.0.1:8001`

3. Iniciar el servidor de desarrollo:
```bash
pnpm run serve
# o
npm run serve
```

4. Abrir el navegador y navegar a:
```
http://localhost:8080
```

## 📦 Estructura del Proyecto

```
library-test-front/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Recursos estáticos
│   ├── components/          # Componentes reutilizables
│   ├── plugins/
│   │   └── vuetify.js       # Configuración de Vuetify
│   ├── router/
│   │   └── index.js         # Rutas de la aplicación
│   ├── services/
│   │   └── api.js           # Cliente API con Axios
│   ├── views/
│   │   ├── BookList.vue     # Vista de libros
│   │   ├── AuthorList.vue   # Vista de autores
│   │   └── CategoryList.vue # Vista de categorías
│   ├── App.vue              # Componente principal
│   └── main.js              # Punto de entrada
├── .gitignore
├── babel.config.js
├── package.json
├── vue.config.js
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **Vue 2.6.14** - Framework JavaScript progresivo
- **Vuetify 2.6.0** - Framework de componentes Material Design
- **Vue Router 3.5.1** - Enrutador oficial de Vue.js
- **Axios 0.27.2** - Cliente HTTP basado en promesas
- **Material Design Icons** - Biblioteca de iconos

## 📱 Vistas

### Vista de Libros (`/books`)
- Muestra una tabla con todos los libros
- Muestra autor y categoría de cada libro
- Barra de búsqueda para filtrar por título
- Filtros desplegables por autor y categoría
- Botones para agregar, editar y eliminar

### Vista de Autores (`/authors`)
- Muestra una tabla con todos los autores
- Barra de búsqueda para filtrar por nombre o nacionalidad
- Select de nacionalidades predefinidas
- Botones para agregar, editar y eliminar

### Vista de Categorías (`/categories`)
- Muestra una tabla con todas las categorías
- Barra de búsqueda para filtrar por nombre
- Botones para agregar, editar y eliminar

## 🎨 Componentes de UI

### Barra de Navegación
- Enlaces a vistas de Libros, Autores y Categorías
- Estilo Material Design con color primario

### Tablas de Datos
- Columnas ordenables
- Estados de carga
- Diseño responsive

### Formularios
- Validación de entrada
- Indicadores de campos requeridos
- Mensajes de error específicos

### Alertas
- Notificaciones de éxito (verde)
- Notificaciones de error (rojo)
- Cierre automático con botón manual

## 🔌 Integración con la API

La aplicación se conecta a la API backend en `http://127.0.0.1:8001/api`

### Endpoints Utilizados

**Libros:**
- `GET /api/books` - Obtener todos los libros
- `POST /api/books` - Crear un libro
- `PUT /api/books/{id}` - Actualizar un libro
- `DELETE /api/books/{id}` - Eliminar un libro

**Autores:**
- `GET /api/authors` - Obtener todos los autores
- `GET /api/authors/nationalities` - Obtener lista de nacionalidades
- `POST /api/authors` - Crear un autor
- `PUT /api/authors/{id}` - Actualizar un autor
- `DELETE /api/authors/{id}` - Eliminar un autor

**Categorías:**
- `GET /api/categories` - Obtener todas las categorías
- `POST /api/categories` - Crear una categoría
- `PUT /api/categories/{id}` - Actualizar una categoría
- `DELETE /api/categories/{id}` - Eliminar una categoría

## 🧪 Ejemplos de Uso

### Agregar un Nuevo Libro

1. Navegar a la vista de Libros
2. Hacer clic en el botón "Nuevo Libro"
3. Llenar el formulario:
   - Título (requerido)
   - Año de Publicación (requerido, debe ser positivo y válido)
   - Seleccionar un Autor (requerido)
   - Seleccionar una Categoría (requerido)
4. Hacer clic en "Guardar"
5. Aparecerá una alerta de éxito

### Filtrar Libros

1. Usar la barra de búsqueda para filtrar por título
2. Usar el menú "Filtrar por Autor" para mostrar solo libros de un autor específico
3. Usar el menú "Filtrar por Categoría" para mostrar solo libros de una categoría específica
4. Los filtros se pueden combinar

### Editar un Autor

1. Navegar a la vista de Autores
2. Hacer clic en el ícono de lápiz junto al autor que deseas editar
3. Modificar los campos en el diálogo
4. Hacer clic en "Guardar"

### Eliminar una Categoría

1. Navegar a la vista de Categorías
2. Hacer clic en el ícono de eliminar junto a la categoría
3. Confirmar la eliminación en el diálogo
4. Nota: Las categorías con libros asociados no se pueden eliminar

## 🎯 Validación de Formularios

Todos los formularios incluyen validación:

- **Campos requeridos**: No pueden estar vacíos
- **Año de Publicación**: Debe ser un número positivo, mínimo 4 dígitos, no mayor al año actual
- **Nombre de Autor**: Solo letras, espacios y caracteres especiales (. - ')
- **Nacionalidad**: Debe seleccionarse de la lista predefinida
- **Selección de Autor/Categoría**: Debe seleccionarse del menú desplegable

Los formularios no se pueden enviar hasta que todas las validaciones pasen.

## 🚨 Manejo de Errores

La aplicación maneja varios escenarios de error:

- Errores de red cuando la API no está disponible
- Errores de validación del backend (mostrados con mensajes específicos)
- Errores de eliminación (ej: intentar eliminar un autor con libros)
- Todos los errores muestran mensajes de alerta amigables para el usuario

## 🎨 Personalización

### Cambiar Colores

Editar `src/plugins/vuetify.js` para personalizar el tema:

```javascript
theme: {
  themes: {
    light: {
      primary: '#1976D2',
      secondary: '#424242',
      // ... otros colores
    }
  }
}
```

### Cambiar URL de la API

Editar `src/services/api.js`:

```javascript
const apiClient = axios.create({
  baseURL: 'http://tu-url-api/api',
  // ...
})
```

## 📝 Compilar para Producción

```bash
pnpm run build
# o
npm run build
```

Esto creará un directorio `dist/` con los archivos optimizados para producción.

## 🐛 Solución de Problemas

### Errores de CORS

Si encuentras errores de CORS, asegúrate de que tu API backend permita solicitudes desde `http://localhost:8080`.

### Problemas de Conexión con la API

1. Verificar que el backend esté ejecutándose en `http://127.0.0.1:8001`
2. Revisar la consola del navegador para mensajes de error
3. Verificar que los endpoints de la API sean accesibles

### Problemas con Dependencias

Si tienes problemas con las dependencias:

```bash
rm -rf node_modules package-lock.json
pnpm install
# o
npm install
```

## 📄 Licencia

Este proyecto es privado y propietario.

## 👥 Contribuciones

Este es un proyecto de prueba. Para cualquier pregunta o problema, contacta al equipo de desarrollo.
