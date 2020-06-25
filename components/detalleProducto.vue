<template>
  <span>
    <v-snackbar v-model="notificacion" color="indigo" :timeout="1000" top>
      Agregado
    </v-snackbar>
    <v-card v-if="producto" nuxt dense outlined>
      <v-card class="ma-0 pa-0 no-border" height="25rem" nuxt dense outlined>
        <v-card-title class="my-0 py-0 title-1">
          {{ producto.nombre }}
        </v-card-title>
        <v-row>
          <v-col>
            <v-img
              height="15rem"
              :width="$vuetify.breakpoint.xsOnly ? '100%' : '25rem'"
              :src="producto.imagen"
            ></v-img>
          </v-col>
          <v-col>
            <v-card-text class="my-0 py-0 caption">
              {{ producto.descripcion }}
            </v-card-text>
            <v-card-text class="my-0 py-0 font-weight-bold">
              Precio: {{ producto.precio }} GTQ
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
      <v-card-actions class="ma-0 pa-0">
        <v-container fluid class="my-0 py-0">
          <v-row>
            <v-spacer />
            <AddCard v-model="dataCant" class="mr-5" />
            <v-btn
              class="mr-5"
              color="indigo"
              width="6rem"
              dark
              small
              @click="agregarCarrito"
            >
              {{ btnAgregar }}
              <v-icon size="1.2rem" class="">{{ shoppingIcon }}</v-icon>
            </v-btn>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </span>
</template>

<script>
import AddCard from '~/components/shopping-cart/addCard'
import { mdiCartArrowDown } from '@mdi/js'
export default {
  name: 'DetalleProducto',
  components: { AddCard },
  props: {
    producto: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      shoppingIcon: mdiCartArrowDown,
      // plusIcon: mdiPlus,
      btnAgregar: 'Agregar',
      dataCant: 1,
      notificacion: false
    }
  },
  methods: {
    agregarCarrito() {
      if (this.dataCant > 0) {
        let prodCarrito = {
          id: this.producto.id,
          nombre: this.producto.nombre,
          descripcion: this.producto.descripcion,
          precio: this.producto.precio,
          imagen: this.producto.imagen,
          cantidad: this.dataCant,
          totalPagar: this.producto.precio * this.dataCant
        }
        this.dataCant = 1
        this.$store.commit('AGREGARCARRITO', prodCarrito)
        this.notificacion = true
      }
    },
    change(valor) {
      return (this.dataCant = parseInt(valor))
    }
  }
}
</script>
<style>
.no-border {
  border: 0 !important;
}
</style>
