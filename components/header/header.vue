<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      class="hidden-md-up"
      disable-resize-watcher
      app
      temporary
    >
      <v-list dense>
        <v-list-item link :to="{ path: '/' }">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            Inicio
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" dense app dark>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      />
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <nuxt-link class="title-app" to="/">
        <v-toolbar-title class="ma-3 indigo--text font-weight-black">
          Delishop
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer></v-spacer>
      <template v-if="$route.path === '/revisa/' ? false : true">
        <v-btn class="mr-5" icon @click="$store.commit('MOSTRARDIALOG')">
          <v-icon color="indigo">
            {{ shoppingIcon }}
          </v-icon>
          <v-badge color="indigo" :content="getCantCarrito" />
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
import { mdiBasket } from '@mdi/js'
export default {
  name: 'VmHeader',
  data() {
    return { drawer: null, shoppingIcon: mdiBasket }
  },
  computed: {
    getCantCarrito() {
      return this.$store.state.cantCarrito
    }
  },
  created() {
    this.$store.commit('INICIARCARRITO')
  }
}
</script>

<style>
.title-app {
  text-decoration: None;
  color: white;
}
a {
  text-decoration: none;
  text-decoration-style: solid;
}
</style>
