import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  // Books
  getBooks() {
    return apiClient.get('/books')
  },
  getBook(id) {
    return apiClient.get(`/books/${id}`)
  },
  createBook(book) {
    return apiClient.post('/books', book)
  },
  updateBook(id, book) {
    return apiClient.put(`/books/${id}`, book)
  },
  deleteBook(id) {
    return apiClient.delete(`/books/${id}`)
  },

  // Authors
  getAuthors() {
    return apiClient.get('/authors')
  },
  getAuthor(id) {
    return apiClient.get(`/authors/${id}`)
  },
  getNationalities() {
    return apiClient.get('/authors/nationalities')
  },
  createAuthor(author) {
    return apiClient.post('/authors', author)
  },
  updateAuthor(id, author) {
    return apiClient.put(`/authors/${id}`, author)
  },
  deleteAuthor(id) {
    return apiClient.delete(`/authors/${id}`)
  },

  // Categories
  getCategories() {
    return apiClient.get('/categories')
  },
  getCategory(id) {
    return apiClient.get(`/categories/${id}`)
  },
  createCategory(category) {
    return apiClient.post('/categories', category)
  },
  updateCategory(id, category) {
    return apiClient.put(`/categories/${id}`, category)
  },
  deleteCategory(id) {
    return apiClient.delete(`/categories/${id}`)
  }
}
