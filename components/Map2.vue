<template>
    <div class="w-full h-96" v-if="latitude && longitude">
        <LMap ref="map" :zoom="zoom" :center="[latitude, longitude]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base" name="OpenStreetMap" />

            <LMarker :lat-lng="[latitude, longitude]" draggable @moveend="log('moveend')">
                <LTooltip>
                    CANADA
                </LTooltip>
            </LMarker>

            <LRectangle
                    :bounds="[
                      [46.334852, -1.190568],
                      [46.241487, -1.090357],
                    ]"
                  >
                    <LPopup>
                      lol
                    </LPopup>
                  </LRectangle>

        </LMap>
    </div>
</template>
<script>
import {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
    components: {
        LMap,
        LIcon,
        LTileLayer,
        LMarker,
        LControlLayers,
        LTooltip,
        LPopup,
        LPolyline,
        LPolygon,
        LRectangle,
    },
    data() {
        return {
            zoom: 2,
            iconWidth: 25,
            iconHeight: 40,
            latitude: 46.334852,
            longitude: -1.190568,            
        };
    },
    computed: {
        iconUrl() {
            return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
        },
        iconSize() {
            return [this.iconWidth, this.iconHeight];
        },
    },
    methods: {
        log(a) {
            console.log(a);
        },
        changeIcon() {
            this.iconWidth += 2;
            if (this.iconWidth > this.iconHeight) {
                this.iconWidth = Math.floor(this.iconHeight / 2);
            }
        },
    },
};
</script>
