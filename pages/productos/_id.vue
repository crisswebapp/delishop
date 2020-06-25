<template>
  <DetalleProducto :producto="producto" />
</template>

<script>
import DetalleProducto from '~/components/detalleProducto'
export default {
  components: { DetalleProducto },
  data() {
    return {
      id: this.$route.params.id
    }
  },
  computed: {
    producto() {
      return this.$store.state.listaProductos.find(item => item.id === this.id)
    }
  }
}
</script>

<style></style>
