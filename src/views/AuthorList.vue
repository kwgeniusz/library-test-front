<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon large left>mdi-account-edit</v-icon>
        <span class="text-h5">Gestión de Autores</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon left>mdi-plus</v-icon>
          Agregar Autor
        </v-btn>
      </v-card-title>

      <!-- Búsqueda -->
      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar por nombre o nacionalidad"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-card-text>

      <!-- Tabla de autores -->
      <v-data-table
        :headers="headers"
        :items="filteredAuthors"
        :loading="loading"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editAuthor(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteAuthor(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog para crear/editar autor -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedAuthor.name"
              label="Nombre *"
              :rules="[rules.required]"
              required
            ></v-text-field>

            <v-select
              v-model="editedAuthor.nationality"
              :items="nationalities"
              label="Nacionalidad *"
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
          <v-btn color="primary" text @click="saveAuthor" :disabled="!valid">
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
          ¿Está seguro que desea eliminar este autor?
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
  name: 'AuthorList',
  data() {
    return {
      authors: [],
      nationalities: [],
      loading: false,
      dialog: false,
      deleteDialog: false,
      valid: false,
      search: '',
      editedIndex: -1,
      editedAuthor: {
        name: '',
        nationality: ''
      },
      defaultAuthor: {
        name: '',
        nationality: ''
      },
      authorToDelete: null,
      headers: [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'Nombre', value: 'name', sortable: true },
        { text: 'Nacionalidad', value: 'nationality', sortable: true },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      rules: {
        required: value => !!value || 'Este campo es requerido'
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo Autor' : 'Editar Autor'
    },
    filteredAuthors() {
      if (!this.search) {
        return this.authors
      }
      const searchLower = this.search.toLowerCase()
      return this.authors.filter(author =>
        author.name.toLowerCase().includes(searchLower) ||
        author.nationality.toLowerCase().includes(searchLower)
      )
    }
  },
  created() {
    this.fetchAuthors()
    this.fetchNationalities()
  },
  methods: {
    async fetchAuthors() {
      this.loading = true
      try {
        const response = await api.getAuthors()
        this.authors = response.data
      } catch (error) {
        this.$root.$alert('Error al cargar los autores', 'error')
        console.error('Error fetching authors:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchNationalities() {
      try {
        const response = await api.getNationalities()
        this.nationalities = response.data
      } catch (error) {
        console.error('Error fetching nationalities:', error)
      }
    },
    openCreateDialog() {
      this.editedIndex = -1
      this.editedAuthor = Object.assign({}, this.defaultAuthor)
      this.dialog = true
    },
    editAuthor(author) {
      this.editedIndex = this.authors.indexOf(author)
      this.editedAuthor = Object.assign({}, author)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedAuthor = Object.assign({}, this.defaultAuthor)
        this.editedIndex = -1
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    },
    async saveAuthor() {
      if (this.$refs.form.validate()) {
        try {
          if (this.editedIndex > -1) {
            // Actualizar autor existente
            const authorId = this.authors[this.editedIndex].id
            await api.updateAuthor(authorId, this.editedAuthor)
            this.$root.$alert('Autor actualizado exitosamente', 'success')
          } else {
            // Crear nuevo autor
            await api.createAuthor(this.editedAuthor)
            this.$root.$alert('Autor creado exitosamente', 'success')
          }
          this.fetchAuthors()
          this.closeDialog()
        } catch (error) {
          console.error('Error completo:', error)
          console.error('Error data:', error.response?.data)
          
          let errorMsg = 'Error al guardar el autor'
          
          if (error.response?.data) {
            const data = error.response.data
            if (data.errors && typeof data.errors === 'object') {
              errorMsg = Object.values(data.errors).join(', ')
            } else if (data.error) {
              errorMsg = data.error
            } else if (data.message) {
              errorMsg = data.message
            } else if (typeof data === 'string') {
              errorMsg = data
            }
          }
          
          this.$root.$alert(errorMsg, 'error')
        }
      }
    },
    deleteAuthor(author) {
      this.authorToDelete = author
      this.deleteDialog = true
    },
    async confirmDelete() {
      try {
        await api.deleteAuthor(this.authorToDelete.id)
        this.$root.$alert('Autor eliminado exitosamente', 'success')
        this.fetchAuthors()
      } catch (error) {
        this.$root.$alert('Error al eliminar el autor. Puede tener libros asociados.', 'error')
        console.error('Error deleting author:', error)
      } finally {
        this.deleteDialog = false
        this.authorToDelete = null
      }
    }
  }
}
</script>
