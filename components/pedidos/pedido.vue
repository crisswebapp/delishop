<template>
  <v-card>
    <v-card-text>
      <p class="caption">
        Pedido id: {{ pedido.id }}<br />Cliente:{{
          cliente.nombres + ' ' + cliente.apellidos
        }}<br />Direccion Entrega: {{ cliente.direccion }}<br />
        Mensaje Repartidor:
        {{
          pedido.mensaje
            ? `${pedido.mensaje}`
            : 'No hay mensaje para el repartidor'
        }}<br />
        Fecha pedido: {{ fecha }} Hora: {{ hora }}<br />
        <strong>Estatus : {{ pedido.estatus }}</strong> <br />
      </p>
      <p>
        <strong>Total a Cobrar: Q.{{ pedido.totalPagar }}</strong>
      </p>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">
              Cantidad
            </th>
            <th class="text-left">
              Nombres
            </th>
            <th>
              Precio
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos" :key="item.id">
            <td class="caption">
              {{ item.cantidad }}
            </td>
            <td class="caption">
              {{ item.nombre }}
            </td>
            <td class="caption">
              {{ item.precio }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Pedido',
  props: {
    pedido: {
      type: Object,
      default: null,
      required: true
    }
  },
  computed: {
    cliente() {
      return this.pedido.cliente
    },
    productos() {
      return this.pedido.productos
    },
    hora() {
      let hora = new Date(this.pedido.date)
      let opciones = { hour12: 'false' }
      hora = hora.toLocaleTimeString('es-ES', opciones)
      return hora
    },
    fecha() {
      let fecha = new Date(this.pedido.date)
      fecha = fecha.toLocaleDateString('es-ES')
      return fecha
    }
  }
}
</script>
