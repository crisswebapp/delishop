<template>
  <div>
    <v-card-title>Completa tu pedido</v-card-title>
    <v-expansion-panels v-model="panels" multiple class="ma-0">
      <v-expansion-panel :key="0">
        <v-expansion-panel-header disable-icon-rotate>
          Tu ubicación
          <template v-slot:actions>
            <v-icon color="red" small>
              {{ iconos.mapbox.text }}
            </v-icon>
            <v-icon color="error">
              {{ iconos.mapbox.icono }}
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card-subtitle class="ml-2 pl-2 subtitle-1">
            <b>Selecciona donde entregaremos tu pedido</b>
          </v-card-subtitle>
          <Mapbox />
          <v-btn :disabled="btnUbi" class="ma-2" width="96%" @click="evBtnUbi">
            Guardar esta ubicación
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :key="1">
        <v-expansion-panel-header disable-icon-rotate="">
          Tu información personal
          <template v-slot:actions>
            <v-icon color="red" small>
              {{ iconos.form.text }}
            </v-icon>
            <v-icon color="error">
              {{ iconos.form.icono }}
            </v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <FormUsuario />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mdiAlertCircle, mdiCheck } from '@mdi/js'
import Mapbox from '~/components/mapbox'
import FormUsuario from '~/components/shopping-cart/formUsuario'
//import DetalleVenta from '~/components/shopping-cart/dellateVenta'
export default {
  components: { Mapbox, FormUsuario },
  data() {
    return {
      pedidoEnv: false,
      enviando: false,
      btnUbi: false,
      alertaIcono: mdiAlertCircle,
      panels: [],
      iconos: {
        mapbox: { icono: mdiAlertCircle, text: '*requerido' },
        form: { icono: mdiAlertCircle, text: '*requerido' }
      }
    }
  },
  computed: {
    cliente() {
      return this.$store.state.pedido.cliente
    },
    pedidoProductos() {
      return this.$store.state.pedido.productos
    },
    totalPagar() {
      return this.$store.state.pedido.totalPagar
    },
    pedido() {
      return this.$store.state.pedido
    }
  },
  mounted() {
    this.panels.push(0)
  },
  methods: {
    async envPedido() {
      this.enviando = true
      let res = await this.$axios.post(
        'https://us-central1-crisscompany.cloudfunctions.net/restaurantes/pedidos',
        this.pedido
      )
      if (res.status === 200) {
        this.enviando = false
        this.$store.commit('REMOVERPEDIDO')
        this.$store.commit('VACIARCARRITOS')
        this.pedidoEnv = true
      }
    },
    cancelar() {
      this.$store.commit('REMOVERPEDIDO')
      this.$router.push({ path: '/' })
    },
    evBtnUbi() {
      this.btnUbi = true
      this.panels.pop()
      this.panels.push(1)
      this.iconos.mapbox.icono = mdiCheck
      this.iconos.mapbox.text = 'Completa'
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css'
        }
      ]
    }
  }
}
</script>
