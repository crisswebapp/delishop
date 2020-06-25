// eslint-disable-next-line no-unused-vars
let mapbox
if (process.client) {
  mapbox = require('mapbox-gl')
  mapbox.accessToken =
    'pk.eyJ1IjoiY3Jpc3Njb21wYW55IiwiYSI6ImNrYWc0dGtvaTAzc2EycXBuZjIxamZxbXMifQ.Anb7_2-uZtHKTDBLmaW8yg'
}

class txtControl {
  constructor(txt) {
    this.txt = txt
  }
  onAdd(map) {
    this.map = map
    this.container = document.createElement('div')
    this.container.className = 'txt-control'
    this.container.textContent = this.txt
    return this.container
  }
  onRemove() {
    this.container.parentNode.removeChild(this.container)
    this.map = undefined
  }
}

export default mapbox
export { txtControl }
