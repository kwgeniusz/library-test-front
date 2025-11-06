# Library Management System - Frontend

Frontend application built with Vue 2 and Vuetify 2 for managing a library's books, authors, and categories.

## 🚀 Features

- **Books Management**
  - List all books with author and category information
  - Create, edit, and delete books
  - Search books by title
  - Filter books by author or category
  
- **Authors Management**
  - List all authors
  - Create, edit, and delete authors
  - Search authors by name or nationality
  
- **Categories Management**
  - List all categories
  - Create, edit, and delete categories
  - Search categories by name

- **Additional Features**
  - Form validation
  - Success/Error alerts
  - Responsive design
  - Material Design UI with Vuetify

## 📋 Requirements

- Node.js >= 14.x
- npm >= 6.x
- Backend API running on http://127.0.0.1:8001

## 🔧 Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend API is running on `http://127.0.0.1:8001`

3. Start the development server:
```bash
npm run serve
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## 📦 Project Structure

```
library-test-front/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   ├── plugins/
│   │   └── vuetify.js
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   └── api.js
│   ├── views/
│   │   ├── BookList.vue
│   │   ├── AuthorList.vue
│   │   └── CategoryList.vue
│   ├── App.vue
│   └── main.js
├── .gitignore
├── babel.config.js
├── package.json
├── vue.config.js
└── README.md
```

## 🛠️ Technologies Used

- **Vue 2.6.14** - Progressive JavaScript Framework
- **Vuetify 2.6.0** - Material Design Component Framework
- **Vue Router 3.5.1** - Official router for Vue.js
- **Axios 0.27.2** - Promise based HTTP client
- **Material Design Icons** - Icon library

## 📱 Views

### Books View (`/books`)
- Displays a table with all books
- Shows author and category for each book
- Search bar to filter by title
- Dropdown filters for author and category
- Add, edit, and delete buttons

### Authors View (`/authors`)
- Displays a table with all authors
- Search bar to filter by name or nationality
- Add, edit, and delete buttons

### Categories View (`/categories`)
- Displays a table with all categories
- Search bar to filter by name
- Add, edit, and delete buttons

## 🎨 UI Components

### Navigation Bar
- Links to Books, Authors, and Categories views
- Material Design styled with primary color

### Data Tables
- Sortable columns
- Loading states
- Responsive design

### Forms
- Input validation
- Required field indicators
- Error messages

### Alerts
- Success notifications (green)
- Error notifications (red)
- Auto-dismiss after 3 seconds

## 🔌 API Integration

The application connects to the backend API at `http://127.0.0.1:8001/api`

### Endpoints Used

**Books:**
- `GET /api/books` - Get all books
- `POST /api/books` - Create a book
- `PUT /api/books/{id}` - Update a book
- `DELETE /api/books/{id}` - Delete a book

**Authors:**
- `GET /api/authors` - Get all authors
- `POST /api/authors` - Create an author
- `PUT /api/authors/{id}` - Update an author
- `DELETE /api/authors/{id}` - Delete an author

**Categories:**
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category
- `PUT /api/categories/{id}` - Update a category
- `DELETE /api/categories/{id}` - Delete a category

## 🧪 Usage Examples

### Adding a New Book

1. Navigate to the Books view
2. Click the "Add Book" button
3. Fill in the form:
   - Title (required)
   - Publication Year (required, must be positive)
   - Select an Author (required)
   - Select a Category (required)
4. Click "Save"
5. Success alert will appear

### Filtering Books

1. Use the search bar to filter by title
2. Use the "Filter by Author" dropdown to show only books by a specific author
3. Use the "Filter by Category" dropdown to show only books in a specific category
4. Filters can be combined

### Editing an Author

1. Navigate to the Authors view
2. Click the pencil icon next to the author you want to edit
3. Modify the fields in the dialog
4. Click "Save"

### Deleting a Category

1. Navigate to the Categories view
2. Click the delete icon next to the category
3. Confirm the deletion in the dialog
4. Note: Categories with associated books cannot be deleted

## 🎯 Form Validation

All forms include validation:

- **Required fields**: Cannot be empty
- **Publication Year**: Must be a positive number
- **Author/Category selection**: Must select from dropdown

Forms cannot be submitted until all validations pass.

## 🚨 Error Handling

The application handles various error scenarios:

- Network errors when API is unavailable
- Validation errors from the backend
- Deletion errors (e.g., trying to delete an author with books)
- All errors show user-friendly alert messages

## 🎨 Customization

### Changing Colors

Edit `src/plugins/vuetify.js` to customize the theme:

```javascript
theme: {
  themes: {
    light: {
      primary: '#1976D2',
      secondary: '#424242',
      // ... other colors
    }
  }
}
```

### Changing API URL

Edit `src/services/api.js`:

```javascript
const apiClient = axios.create({
  baseURL: 'http://your-api-url/api',
  // ...
})
```

## 📝 Build for Production

```bash
npm run build
```

This will create a `dist/` directory with optimized production files.

## 🐛 Troubleshooting

### CORS Errors

If you encounter CORS errors, make sure your backend API allows requests from `http://localhost:8080`.

### API Connection Issues

1. Verify the backend is running on `http://127.0.0.1:8001`
2. Check the browser console for error messages
3. Verify the API endpoints are accessible

### Dependencies Issues

If you have issues with dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a test project. For any questions or issues, please contact the development team.
