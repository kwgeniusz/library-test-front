<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon large left>mdi-book-multiple</v-icon>
        <span class="text-h5">Gestión de Libros</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon left>mdi-plus</v-icon>
          Agregar Libro
        </v-btn>
      </v-card-title>

      <!-- Filtros y búsqueda -->
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar por título"
              single-line
              hide-details
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filterAuthor"
              :items="authors"
              item-text="name"
              item-value="id"
              label="Filtrar por Autor"
              clearable
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filterCategory"
              :items="categories"
              item-text="name"
              item-value="id"
              label="Filtrar por Categoría"
              clearable
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Tabla de libros -->
      <v-data-table
        :headers="headers"
        :items="filteredBooks"
        :loading="loading"
        class="elevation-1"
      >
        <template v-slot:[`item.author`]="{ item }">
          <v-chip small color="primary" text-color="white">
            {{ item.author.name }}
          </v-chip>
        </template>

        <template v-slot:[`item.category`]="{ item }">
          <v-chip small color="secondary" text-color="white">
            {{ item.category.name }}
          </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editBook(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteBook(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog para crear/editar libro -->
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedBook.title"
              label="Título *"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <v-text-field
              v-model.number="editedBook.publicationYear"
              label="Año de Publicación *"
              type="number"
              :rules="[rules.required, rules.positiveNumber]"
              required
            ></v-text-field>

            <v-select
              v-model="editedBook.authorId"
              :items="authors"
              item-text="name"
              item-value="id"
              label="Autor *"
              :rules="[rules.required]"
              required
            ></v-select>

            <v-select
              v-model="editedBook.categoryId"
              :items="categories"
              item-text="name"
              item-value="id"
              label="Categoría *"
              :rules="[rules.required]"
              required
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="saveBook" :disabled="!valid">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmación para eliminar -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="text-h5">Confirmar Eliminación</v-card-title>
        <v-card-text>
          ¿Está seguro que desea eliminar este libro?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="error" text @click="confirmDelete">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  name: 'BookList',
  data() {
    return {
      books: [],
      authors: [],
      categories: [],
      loading: false,
      dialog: false,
      deleteDialog: false,
      valid: false,
      search: '',
      filterAuthor: null,
      filterCategory: null,
      editedIndex: -1,
      editedBook: {
        title: '',
        publicationYear: null,
        authorId: null,
        categoryId: null
      },
      defaultBook: {
        title: '',
        publicationYear: null,
        authorId: null,
        categoryId: null
      },
      bookToDelete: null,
      headers: [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'Título', value: 'title', sortable: true },
        { text: 'Año de Publicación', value: 'publicationYear', sortable: true },
        { text: 'Autor', value: 'author', sortable: false },
        { text: 'Categoría', value: 'category', sortable: false },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      rules: {
        required: value => !!value || 'Este campo es requerido',
        positiveNumber: value => value > 0 || 'Debe ser un número positivo'
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Libro' : 'Editar Libro'
    },
    filteredBooks() {
      let filtered = this.books

      // Filtrar por búsqueda de título
      if (this.search) {
        filtered = filtered.filter(book =>
          book.title.toLowerCase().includes(this.search.toLowerCase())
        )
      }

      // Filtrar por autor
      if (this.filterAuthor) {
        filtered = filtered.filter(book => book.author.id === this.filterAuthor)
      }

      // Filtrar por categoría
      if (this.filterCategory) {
        filtered = filtered.filter(book => book.category.id === this.filterCategory)
      }

      return filtered
    }
  },
  created() {
    this.fetchBooks()
    this.fetchAuthors()
    this.fetchCategories()
  },
  methods: {
    async fetchBooks() {
      this.loading = true
      try {
        const response = await api.getBooks()
        this.books = response.data
      } catch (error) {
        this.$root.$alert('Error al cargar los libros', 'error')
        console.error('Error fetching books:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchAuthors() {
      try {
        const response = await api.getAuthors()
        this.authors = response.data
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    },
    async fetchCategories() {
      try {
        const response = await api.getCategories()
        this.categories = response.data
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },
    openCreateDialog() {
      this.editedIndex = -1
      this.editedBook = Object.assign({}, this.defaultBook)
      this.dialog = true
    },
    editBook(book) {
      this.editedIndex = this.books.indexOf(book)
      this.editedBook = {
        title: book.title,
        publicationYear: book.publicationYear,
        authorId: book.author.id,
        categoryId: book.category.id
      }
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedBook = Object.assign({}, this.defaultBook)
        this.editedIndex = -1
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    },
    async saveBook() {
      if (this.$refs.form.validate()) {
        try {
          if (this.editedIndex > -1) {
            // Actualizar libro existente
            const bookId = this.books[this.editedIndex].id
            await api.updateBook(bookId, this.editedBook)
            this.$root.$alert('Libro actualizado exitosamente', 'success')
          } else {
            // Crear nuevo libro
            await api.createBook(this.editedBook)
            this.$root.$alert('Libro creado exitosamente', 'success')
          }
          this.fetchBooks()
          this.closeDialog()
        } catch (error) {
          console.error('Error completo:', error)
          console.error('Error response:', error.response)
          console.error('Error data:', error.response?.data)
          
          let errorMsg = 'Error al guardar el libro'
          
          if (error.response?.data) {
            const data = error.response.data
            
            // Formato 1: {errors: {field: "mensaje"}}
            if (data.errors && typeof data.errors === 'object') {
              errorMsg = Object.values(data.errors).join(', ')
            }
            // Formato 2: {error: "mensaje"}
            else if (data.error) {
              errorMsg = data.error
            }
            // Formato 3: {message: "mensaje"}
            else if (data.message) {
              errorMsg = data.message
            }
            // Formato 4: string directo
            else if (typeof data === 'string') {
              errorMsg = data
            }
          }
          
          this.$root.$alert(errorMsg, 'error')
        }
      }
    },
    deleteBook(book) {
      this.bookToDelete = book
      this.deleteDialog = true
    },
    async confirmDelete() {
      try {
        await api.deleteBook(this.bookToDelete.id)
        this.$root.$alert('Libro eliminado exitosamente', 'success')
        this.fetchBooks()
      } catch (error) {
        this.$root.$alert('Error al eliminar el libro', 'error')
        console.error('Error deleting book:', error)
      } finally {
        this.deleteDialog = false
        this.bookToDelete = null
      }
    }
  }
}
</script>
