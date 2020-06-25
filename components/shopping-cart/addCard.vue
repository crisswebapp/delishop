<template>
  <v-card width="5.4rem" height="1.85rem" dense flat outlined>
    <v-row no-gutters>
      <v-col>
        <v-btn
          class="customSize mb-2"
          color="indigo"
          icon
          small
          @click="restarUno"
        >
          <v-icon small>
            {{ minusIcon }}
          </v-icon>
        </v-btn>
        <input
          v-model.number="valor"
          class="input"
          type="text"
          disabled="disabled"
          @input="updateValue($event.target.value)"
        />
        <v-btn
          class="customSize mb-2"
          color="indigo"
          small
          icon
          @click="sumarUno"
        >
          <v-icon small>
            {{ plusIcon }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiPlus, mdiMinus } from '@mdi/js'
export default {
  name: 'AddCard',
  props: {
    value: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      plusIcon: mdiPlus,
      minusIcon: mdiMinus,
      cantidad: this.value
    }
  },
  computed: {
    valor: {
      get: function() {
        return this.value
      },
      set: function(newValor) {
        this.cantidad = newValor
      }
    }
  },
  methods: {
    sumarUno() {
      this.valor++
      this.updateValue(parseInt(this.cantidad))
    },
    restarUno() {
      if (this.valor > 1) {
        this.valor--
        this.updateValue(parseInt(this.cantidad))
      }
    },
    // eslint-disable-next-line no-unused-vars
    updateValue(valor) {
      if (!isNaN(parseInt(valor))) {
        this.$emit('input', parseInt(valor))
      }
    }
  }
}
</script>

<style>
.input {
  -webkit-appearance: none;
  border: none;
  text-align: center;
  width: 1.25rem !important;
  height: 1.5 !important;
  font-size: 1.1em !important;
  color: #43484d;
  font-weight: 300;
  margin-bottom: 0.5rem !important;
}
.customSize {
  display: inline-block;
  width: 1.8rem;
  height: 1.7rem;
}
</style>
