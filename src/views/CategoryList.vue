<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon large left>mdi-shape</v-icon>
        <span class="text-h5">Gestión de Categorías</span>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openCreateDialog">
          <v-icon left>mdi-plus</v-icon>
          Agregar Categoría
        </v-btn>
      </v-card-title>

      <!-- Búsqueda -->
      <v-card-text>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar por nombre"
          single-line
          hide-details
          clearable
        ></v-text-field>
      </v-card-text>

      <!-- Tabla de categorías -->
      <v-data-table
        :headers="headers"
        :items="filteredCategories"
        :loading="loading"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editCategory(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteCategory(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <!-- Dialog para crear/editar categoría -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="editedCategory.name"
              label="Nombre *"
              :rules="[rules.required]"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="saveCategory" :disabled="!valid">
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
          ¿Está seguro que desea eliminar esta categoría?
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
  name: 'CategoryList',
  data() {
    return {
      categories: [],
      loading: false,
      dialog: false,
      deleteDialog: false,
      valid: false,
      search: '',
      editedIndex: -1,
      editedCategory: {
        name: ''
      },
      defaultCategory: {
        name: ''
      },
      categoryToDelete: null,
      headers: [
        { text: 'ID', value: 'id', sortable: true },
        { text: 'Nombre', value: 'name', sortable: true },
        { text: 'Acciones', value: 'actions', sortable: false }
      ],
      rules: {
        required: value => !!value || 'Este campo es requerido'
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva Categoría' : 'Editar Categoría'
    },
    filteredCategories() {
      if (!this.search) {
        return this.categories
      }
      const searchLower = this.search.toLowerCase()
      return this.categories.filter(category =>
        category.name.toLowerCase().includes(searchLower)
      )
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      this.loading = true
      try {
        const response = await api.getCategories()
        this.categories = response.data
      } catch (error) {
        this.$root.$alert('Error al cargar las categorías', 'error')
        console.error('Error fetching categories:', error)
      } finally {
        this.loading = false
      }
    },
    openCreateDialog() {
      this.editedIndex = -1
      this.editedCategory = Object.assign({}, this.defaultCategory)
      this.dialog = true
    },
    editCategory(category) {
      this.editedIndex = this.categories.indexOf(category)
      this.editedCategory = Object.assign({}, category)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedCategory = Object.assign({}, this.defaultCategory)
        this.editedIndex = -1
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    },
    async saveCategory() {
      if (this.$refs.form.validate()) {
        try {
          if (this.editedIndex > -1) {
            // Actualizar categoría existente
            const categoryId = this.categories[this.editedIndex].id
            await api.updateCategory(categoryId, this.editedCategory)
            this.$root.$alert('Categoría actualizada exitosamente', 'success')
          } else {
            // Crear nueva categoría
            await api.createCategory(this.editedCategory)
            this.$root.$alert('Categoría creada exitosamente', 'success')
          }
          this.fetchCategories()
          this.closeDialog()
        } catch (error) {
          console.error('Error completo:', error)
          console.error('Error data:', error.response?.data)
          
          let errorMsg = 'Error al guardar la categoría'
          
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
    deleteCategory(category) {
      this.categoryToDelete = category
      this.deleteDialog = true
    },
    async confirmDelete() {
      try {
        await api.deleteCategory(this.categoryToDelete.id)
        this.$root.$alert('Categoría eliminada exitosamente', 'success')
        this.fetchCategories()
      } catch (error) {
        this.$root.$alert('Error al eliminar la categoría. Puede tener libros asociados.', 'error')
        console.error('Error deleting category:', error)
      } finally {
        this.deleteDialog = false
        this.categoryToDelete = null
      }
    }
  }
}
</script>
