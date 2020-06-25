<template>
  <span>
    <v-card nuxt dense>
      <v-card
        class="ma-0 pa-0 no-border"
        :to="{ name: 'productos-id', params: { id: producto.id } }"
        height="16rem"
        nuxt
        dense
        outlined
      >
        <v-img height="10rem" :src="producto.imagen"></v-img>
        <v-card-title class="my-0 py-0 subtitle-1">
          {{ producto.nombre }}
        </v-card-title>
        <v-card-text class="my-0 py-0 caption">
          {{ producto.descripcion }}
        </v-card-text>
        <v-card-text class="my-0 py-0 font-weight-bold">
          Precio: {{ producto.precio }} GTQ
        </v-card-text>
      </v-card>
    </v-card>
  </span>
</template>

<script>
import { mdiBasketFill, mdiPlus } from '@mdi/js'
export default {
  name: 'VmProducto',
  props: {
    producto: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      shoppingIcon: mdiBasketFill,
      plusIcon: mdiPlus,
      btnAgregar: 'Agregar',
      dataCant: 1
    }
  }
}
</script>
