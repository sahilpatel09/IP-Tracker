<template>
    <div id="map" class="map"></div>
  </template>
  
  <script>
  import 'ol/ol.css';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import Feature from 'ol/Feature';
  import Point from 'ol/geom/Point';
  import { Icon, Style } from 'ol/style';
  import VectorSource from 'ol/source/Vector';
  import VectorLayer from 'ol/layer/Vector';
  
  export default {
    mounted() {
      this.initializeMap();
    },
    methods: {
      initializeMap() {
        // Initialize the map
        const map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM()
            })
          ],
          view: new View({
            center: ol.proj.fromLonLat([[-79.2928, 43.1373]]),
            zoom: 18
          })
        });
  
        // Add a marker to the map
        const marker = new Feature({
          geometry: new Point([-79.2928, 43.1373])
        //   geometry: new Point([43.1373, -79.2928])
        });
  
        marker.setStyle(new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            anchor: [-79.2928, 43.1373]
          })
        }));
  
        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [marker]
          })
        });
  
        map.addLayer(vectorLayer);
      }
    }
  }
  </script>
  
  <style scoped>
  .map {
    width: 100%;
    height: 400px;
  }
  </style>
  