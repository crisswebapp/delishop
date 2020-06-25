//const persistInterval = 24 * 60 * 60 * 1000 // 1 day

const plugin = store => {
  store.subscribe((mutation, state) => {
    // Save to local storage all the changes made in the cart state
    if (
      'AGREGARCARRITO' === mutation.type ||
      'ACTUALIZARCARRITO' === mutation.type ||
      'REMOVERCARRITO' === mutation.type ||
      'VACIARCARRITOS' === mutation.type
    ) {
      let record = {
        data: state.carrito,
        cant: state.cantCarrito
        //ts: new Date().getTime() + persistInterval
      }
      try {
        sessionStorage.setItem('mi_carrito', JSON.stringify(record))
      } catch (e) {
        //
      }
    }

    // When cart is created, get the state from local storage if exists
    if ('INICIARCARRITO' === mutation.type) {
      let storage = false
      try {
        storage = sessionStorage.getItem('mi_carrito') || false
        if (storage) {
          storage = JSON.parse(storage)
        }
      } catch (e) {
        //
      }
      if (storage /*&& new Date().getTime() < storage.ts*/) {
        store.commit('CARGARCARRITO', storage)
      }
    }
  })
}
export default plugin
