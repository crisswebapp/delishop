<template>
  <v-app>
    <VmHeader />
    <v-content>
      <v-container fluid>
        <nuxt />
        <DialogShopping />
      </v-container>
    </v-content>
    <VmFooter />
  </v-app>
</template>

<script>
import DialogShopping from '~/components/shopping-cart/dialogShoping'
import VmHeader from '~/components/header/header'
import VmFooter from '~/components/footer/footer'

export default {
  components: { VmFooter, VmHeader, DialogShopping }
}
</script>
