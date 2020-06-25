<template>
  <div id="map" :class="map" />
</template>
<script>
import mapboxgl from '~/plugins/mapbox'
import { txtControl } from '~/plugins/mapbox'
export default {
  name: 'Mapbox',
  data() {
    return {
      posición: [-90.75, 15],
      deshabilitarGeo: true
    }
  },
  computed: {
    map() {
      return this.$vuetify.breakpoint.xsOnly ? 'mapMovil' : 'mapWeb'
    }
  },
  mounted() {
    this.addMap()
  },
  methods: {
    async addMap() {
      // eslint-disable-next-line no-unused-vars
      let txtInfo = new txtControl('Click aquí para obtener tu ubicación')
      let mark = new mapboxgl.Marker()
      let nav = new mapboxgl.NavigationControl()
      let geo = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        fitBoundsOptions: { maxZoom: 25 },
        trackUserLocation: true,
        showAccuracyCircle: false,
        showUserLocation: true
      })
      const map = await new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 6,
        center: this.posición
      })
      map.addControl(geo, 'top-left')
      map.addControl(nav)
      map.addControl(txtInfo, 'top-left')
      map.on('click', ev => {
        if (this.deshabilitarGeo) {
          geo.trigger()
          this.deshabilitarGeo = false
        }
        let coords = { lng: ev.lngLat.lng, lat: ev.lngLat.lat }
        mark.setLngLat(ev.lngLat).addTo(map)
        this.$emit('input', coords)
      })
      geo.on('geolocate', ev => {
        let coords = { lng: ev.coords.longitude, lat: ev.coords.latitude }
        mark.setLngLat(coords).addTo(map)
        this.$emit('input', coords)
      })
      geo.on('error', () => {
        map.removeControl(txtInfo)
        txtInfo.txt = 'Puedes Seleccionar tu ubicación manualmente'
        map.addControl(txtInfo, 'top-left')
      })
    }
  }
}
</script>
<style>
.mapMovil {
  height: 20rem;
  width: 100%;
}
.mapWeb {
  height: 25rem;
  width: 25rem;
}
.txt-control {
  text-align: center;
  font-weight: 500;
  color: white;
  background: rgb(68, 44, 192);
  padding: 8px;
  border-radius: 4px;
  margin: 8px;
  width: 15rem;
  height: 2.1rem;
}
</style>
