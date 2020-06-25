<template>
  <v-card v-if="productos" flat tile>
    <v-card-text class="mb-0 pb-0">
      Productos
    </v-card-text>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Producto
            </th>
            <th class="text-left">
              Cantidad
            </th>
            <th>
              Precio
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in productos" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td>{{ item.cantidad }}</td>
            <td>{{ item.precio }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>
<script>
export default {
  name: 'DetalleVenta',
  computed: {
    productos() {
      return this.$store.state.pedido.productos
    }
  }
}
</script>
