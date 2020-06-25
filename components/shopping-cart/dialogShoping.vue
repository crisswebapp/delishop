<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      hide-overlay
    >
      <v-card id="venta" class="m-0 p-0 " dense tile>
        <v-toolbar max-height="3.5rem" dark color="indigo">
          <v-btn icon dark @click="$store.commit('OCULTARDIALOG')">
            <v-icon>{{ closeIcon }}</v-icon>
          </v-btn>
          <v-toolbar-title>Canasta</v-toolbar-title>
          <v-spacer />
          <v-toolbar-title>Total : Q.{{ totalPagar }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="6">
              <template v-for="item in prodsCarrito">
                <ProductoCard :key="item.id" :producto="item" />
              </template>
            </v-col>
            <v-col cols="12" md="6">
              <v-divider class="hidden-md-and-up" />
              <v-btn
                color="indigo"
                height="4rem"
                width="100%"
                dark
                @click="click"
              >
                Siguiente: Ir a finalizar pedido
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mdiClose } from '@mdi/js'
import ProductoCard from '~/components/shopping-cart/productoCard'

export default {
  name: 'DialogShopping',
  components: { ProductoCard },
  data() {
    return {
      closeIcon: mdiClose,
      detalleVenta: false
    }
  },
  computed: {
    dialog: {
      get: function() {
        return this.$store.state.dialogShopping
      },
      set: function() {
        this.$store.commit('OCULTARDIALOG')
      }
    },
    prodsCarrito() {
      return this.$store.state.carrito
    },
    totalPagar() {
      let total = 0
      for (let item in this.$store.state.carrito) {
        total += this.$store.state.carrito[item].totalPagar
      }
      return total
    }
  },
  methods: {
    click() {
      this.$store.commit('OCULTARDIALOG')
      this.$router.push({ path: '/revisa' })
    }
  }
}
</script>

<style>
.dialog-bottom-transition-leave-active,
.dialog-bottom-transition-enter-active {
  transition: all 0.6s !important;
}
</style>
