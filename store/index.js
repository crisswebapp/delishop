import PersistData from '~/plugins/persist-data'
export const plugins = [PersistData]
export const state = () => ({
  listaProductos: [],
  carrito: [],
  producto: {},
  cantCarrito: 0,
  dialogShopping: false,
  pedido: {}
})

export const mutations = {
  SETPRODUCTOS(state, productos) {
    state.listaProductos = productos
  },
  CARGARCARRITO(state, storage) {
    state.carrito = storage.data
    state.cantCarrito = storage.cant
  },
  AGREGARCARRITO(state, producto) {
    state.cantCarrito += producto.cantidad
    const index = state.carrito.findIndex(item => producto.id === item.id)
    if (index >= 0) {
      state.carrito[index].cantidad += producto.cantidad
      state.carrito[index].totalPagar =
        state.carrito[index].precio * state.carrito[index].cantidad
    } else {
      state.carrito.push(producto)
    }
  },
  REMOVERCARRITO(state, id) {
    const index = state.carrito.findIndex(item => item.id === id)
    if (index >= 0) {
      let item = state.carrito.splice(index, 1)
      item = item[0]
      state.cantCarrito -= item.cantidad
    }
  },
  ACTUALIZARCARRITO(state, data) {
    const index = state.carrito.findIndex(item => item.id === data.id)
    if (index >= 0) {
      state.carrito[index].cantidad += data.valor
      state.carrito[index].totalPagar =
        state.carrito[index].precio * state.carrito[index].cantidad
      state.cantCarrito += data.valor
    }
  },
  VACIARCARRITOS(state) {
    state.carrito = []
    state.cantCarrito = 0
  },
  OCULTARDIALOG(state) {
    state.dialogShopping = false
  },
  MOSTRARDIALOG(state) {
    state.dialogShopping = true
  },
  INICIARCARRITO() {
    //
  },
  CARGARPEDIDO(state, pedido) {
    state.pedido = pedido
  },
  REMOVERPEDIDO(state) {
    state.pedido = {}
  }
}
export const getters = {
  getProdsCategoria: state => categoria => {
    return state.listaProductos.filter(
      producto => producto.categoria === categoria
    )
  }
}
export const actions = {
  async nuxtServerInit({ commit }) {
    let data = await this.$axios.$get(
      'https://us-central1-crisscompany.cloudfunctions.net/app'
    )
    commit('SETPRODUCTOS', data)
  }
}
