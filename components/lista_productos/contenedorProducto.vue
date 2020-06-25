<template>
  <v-container dense fluid>
    <v-row align="stretch">
      <template v-for="item in listaProductos">
        <v-col :key="item.id" cols="12" sm="6" md="4" lg="3">
          <VmProducto :producto="item" />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import VmProducto from '~/components/producto'
export default {
  name: 'VmContenedorProductos',
  components: { VmProducto },
  props: {
    categoria: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      posts: {},
      title: null,
      cant: 0
    }
  },
  computed: {
    listaProductos() {
      return this.$store.getters['getProdsCategoria'](this.categoria)
    }
  }
}
</script>
<style></style>
