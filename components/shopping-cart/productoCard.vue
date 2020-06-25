<template>
  <v-container v-if="producto" class="ma-0 pa-0" fluid>
    <v-card
      class="my-0.5 pa-0"
      :height="$vuetify.breakpoint.xsOnly ? '6.5rem' : '8.5rem'"
      outlined
      flat
    >
      <v-row align="start" justify="start" dense>
        <v-col cols="4">
          <v-card-title class="ma-0 pa-0 text-left" :class="adapText">
            {{ producto.nombre }}
          </v-card-title>
          <v-img
            class="ma-0 pa-0"
            :height="$vuetify.breakpoint.xsOnly ? '4rem' : '6rem'"
            :width="$vuetify.breakpoint.xsOnly ? '4rem' : '7rem'"
            :src="producto.imagen"
          ></v-img>
        </v-col>
        <v-col cols="2">
          <v-card-title class="ma-0 pa-0 text-left" :class="adapText">
            Precio
          </v-card-title>
          <v-card-text class="my-5 ml-1 pa-0 text-left">
            {{ producto.precio }}
          </v-card-text>
        </v-col>
        <v-col cols="4">
          <v-card-title class="ma-0 pa-0 text-left" :class="adapText">
            Cantidad
          </v-card-title>
          <AddCard v-model="cantidad" class="my-5" />
        </v-col>
        <v-col cols="2">
          <v-card-title class="ma-0 pa-0 text-left" :class="adapText">
            Quitar
          </v-card-title>
          <v-btn
            class="my-4 ml-2"
            color="indigo"
            small
            icon
            @click="$store.commit('REMOVERCARRITO', producto.id)"
          >
            <v-icon>
              {{ EliminarIcon }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import AddCard from '~/components/shopping-cart/addCard'
import { mdiBasketUnfill } from '@mdi/js'
export default {
  name: 'ProductoCard',
  components: { AddCard },
  props: {
    producto: {
      type: Object,
      default: null,
      required: true
    }
  },
  data() {
    return {
      prodCantidad: this.producto.cantidad,
      EliminarIcon: mdiBasketUnfill
    }
  },
  computed: {
    cantidad: {
      get: function() {
        return this.producto.cantidad
      },
      set: function(valor) {
        let nValor = valor - this.producto.cantidad
        let data = { id: this.producto.id, valor: nValor }
        this.$store.commit('ACTUALIZARCARRITO', data)
      }
    },
    adapText() {
      return this.$vuetify.breakpoint.xsOnly
        ? 'caption font-weight-bold'
        : 'subtitle-2 font-weight-bold'
    }
  }
}
</script>
