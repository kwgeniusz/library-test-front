<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>
        <v-icon left>mdi-book-open-page-variant</v-icon>
        Sistema de Gestión de Biblioteca
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn text to="/books">
        <v-icon left>mdi-book-multiple</v-icon>
        Libros
      </v-btn>

      <v-btn text to="/authors">
        <v-icon left>mdi-account-edit</v-icon>
        Autores
      </v-btn>

      <v-btn text to="/categories">
        <v-icon left>mdi-shape</v-icon>
        Categorías
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Sistema de alertas con v-alert -->
    <v-dialog
      v-model="alert.show"
      max-width="500"
      persistent
    >
      <v-alert
        :type="alert.type"
        prominent
        border="left"
        colored-border
        elevation="2"
        class="ma-0"
      >
        <v-row align="center" no-gutters>
          <v-col class="grow">
            <div class="text-h6">{{ alert.title }}</div>
            <div>{{ alert.message }}</div>
          </v-col>
          <v-col class="shrink">
            <v-btn
              :color="alert.type"
              text
              @click="alert.show = false"
            >
              Cerrar
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      alert: {
        show: false,
        type: 'success',
        title: '',
        message: ''
      }
    }
  },
  created() {
    // Configurar el sistema de alertas global
    this.$root.$alert = this.showAlert
  },
  methods: {
    showAlert(message, type = 'success') {
      // Mapear los tipos de color a tipos de v-alert
      const alertTypes = {
        'success': 'success',
        'error': 'error',
        'warning': 'warning',
        'info': 'info'
      }
      
      const titles = {
        'success': '✓ Éxito',
        'error': '✗ Error',
        'warning': '⚠ Advertencia',
        'info': 'ℹ Información'
      }
      
      this.alert.type = alertTypes[type] || 'info'
      this.alert.title = titles[type] || 'Notificación'
      this.alert.message = message
      this.alert.show = true
      
      // Auto-cerrar después de 3 segundos para alertas de éxito
      if (type === 'success') {
        setTimeout(() => {
          this.alert.show = false
        }, 3000)
      }
    }
  }
}
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
