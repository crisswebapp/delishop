<template>
  <div>
    <v-card-text class="ma-0 px-0">
      * Campos requeridos
    </v-card-text>
    <v-card class="ma-0 pa-0" outlined>
      <v-form>
        <v-text-field
          v-model="nombres"
          :error-messages="nameError"
          counter
          required
          label="*Nombres"
          @input="$v.nombres.$touch()"
          @blur="$v.nombres.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="apellidos"
          :error-messages="apellidosError"
          counter
          label="*Apellidos"
          @input="$v.apellidos.$touch()"
          @blur="$v.apellidos.$touch()"
        >
        </v-text-field>
        <v-text-field
          v-model="telefono"
          :error-messages="telefonoError"
          :counter="8"
          label="*Telefono"
          @input="$v.telefono.$touch()"
          @blur="$v.telefono.$touch()"
        ></v-text-field>
        <div v-if="invalidForm">
          <v-card-text>
            Llene el formulario correctamente
          </v-card-text>
        </div>
        <v-btn color="indigo" dark @click.prevent="enviarPedido">
          Enviar Pedido
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, numeric } from 'vuelidate/lib/validators'
const numberLength = params => params.length === 8
export default {
  name: 'FormUsuario',
  mixins: [validationMixin],
  validations: {
    nombres: { required },
    apellidos: { required },
    direccion: { required, minLength: minLength(15) },
    telefono: {
      required,
      numeric,
      numberLength
    }
  },
  data() {
    return {
      nombres: '',
      apellidos: '',
      direccion: '',
      mensaje: '',
      telefono: '',
      invalid: false
    }
  },
  computed: {
    invalidForm() {
      return this.invalid
    },
    nameError() {
      const errors = []
      if (!this.$v.nombres.$dirty) return errors
      !this.$v.nombres.required && errors.push('Su nombre es requerido')
      return errors
    },
    apellidosError() {
      const errors = []
      if (!this.$v.apellidos.$dirty) return errors
      !this.$v.apellidos.required && errors.push('Su apellido es requerido')
      return errors
    },
    telefonoError() {
      const errors = []
      if (!this.$v.telefono.$dirty) return errors
      !this.$v.telefono.required && errors.push('Su telefono es requerido')
      !this.$v.telefono.numeric && errors.push('Numero de telefono invalido')
      !this.$v.telefono.numberLength &&
        errors.push('Numero de telefono invalido')
      return errors
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
    async enviarPedido() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.invalid === true
      } else {
        try {
          this.$emit('click')
          let pedido = {}
          pedido.cliente = {
            nombres: this.nombres,
            apellidos: this.apellidos,
            direccion: this.direccion,
            telefono: this.telefono
          }
          pedido.mensaje = this.mensaje
          pedido.productos = this.$store.state.carrito
          pedido.totalPagar = this.totalPagar
          pedido.estatus = 'Enviado'
          pedido.date = new Date()
          this.$store.commit('CARGARPEDIDO', pedido)
          this.limpiarCampos()
          this.$router.push({ path: '/revisa/' })
          this.$store.commit('OCULTARDIALOG')
        } catch (e) {
          console.error(e)
        }
      }
    },
    limpiarCampos() {
      this.$v.$reset()
    }
  }
}
</script>
