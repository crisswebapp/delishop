<template>
  <div>
    <v-tabs grow>
      <template v-for="categoria in categorias">
        <v-tab :key="categoria">
          {{ categoria }}
        </v-tab>
      </template>
      <v-tab-item v-for="categoria in categorias" :key="categoria">
        <VmcontenedorProducto :categoria="categoria" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import VmcontenedorProducto from '~/components/lista_productos/contenedorProducto'
export default {
  components: {
    VmcontenedorProducto
  },
  data() {
    return {
      categorias: ['principal', 'frappes', 'hamburguesas']
    }
  },
  created() {
    //this.getData()
    // estos sun unos datos males
  },
  methods: {
    async getData() {
      let data = await this.$axios.$get(
        'https://us-central1-crisscompany.cloudfunctions.net/app'
      )
      this.$store.commit('SETPRODUCTOS', data)
    }
  }
}
</script>
