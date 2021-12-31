<template>

    <div class="container-fluid" v-if="ipAddress">
      <div class="row justify-content-center banner">
        <div class="col-md-8 col-sm-6">
          <form @submit.prevent="sendInfo">
              <input type="text" class="textField" name="ipinput" placeholder="IP Address" v-model="ipInput" />
              <input type="submit" class="buttonSend" name="sendInfo" />
              <p align="center" v-if="error" style="color:green;">Invalid IP Adress.</p>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-sm-6 ipData" v-if="ipData">
          <article>
            <header>
              <a href="#close" aria-label="Close" class="close"></a>
              <span class="IP">{{ipAddress}}</span> - {{ipData.city}}, {{ipData.region}}, {{ipData.country_capital}}
            </header>
            <div class="col-md-12">
              <span class=" badgeData badge rounded-pill"><i class="fa fa-phone"></i>{{ipData.country_calling_code}}</span>
              <span class=" badgeData badge rounded-pill"><i class="fa fa-globe-asia"></i>{{ipData.country_name}}</span>
              <span class=" badgeData badge rounded-pill"><i class="fa fa-city"></i>{{ipData.country_capital}}</span>
              <span class=" badgeData badge rounded-pill"><i class="fa fa-ethernet"></i>{{ipData.version}}</span>
              <span class=" badgeData badge rounded-pill"><i class="fa fa-network-wired"></i>{{ipData.org}}</span>
              <span class=" badgeData badge rounded-pill"><i class="fa fa-money-check-alt"></i>{{ipData.currency}}</span>
              <span class=" badgeData badge rounded-pill"><i class="fa fa-ethernet"></i>{{ipData.version}}</span>
              <br />
              <span class=" badgeData badge rounded-pill bg-primary">{{ipData.timezone}}</span>
              <span class=" badgeData badge rounded-pill bg-primary">{{ipData.country_tld}}</span>


              <span class=" badgeData badge rounded-pill bg-primary"><i>PostalCode : </i>{{ipData.postal}}</span>

              
            
            </div>
          </article>
        </div>

        <div class="col-md-6 col-sm-6" v-if="ipData">
            <div style="height: 60vh; width: 100%;">
                <l-map
                  v-model="zoom"
                  v-model:zoom="zoom"
                  :center="[lat, lang]"
                  @move="log('move')"
                >
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  ></l-tile-layer>

                  <l-control-layers />
                  
                  <!-- <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
                    <l-tooltip>
                      lollllllll
                    </l-tooltip>
                  </l-marker> -->

                

                  <l-marker :lat-lng="[lat, lang]" draggable @moveend="log('moveend')">
                    <l-tooltip>
                      {{ipData.region}}
                    </l-tooltip>
                  </l-marker>

                  

                 
                  <l-rectangle
                    :bounds="[
                      [46.334852, -1.190568],
                      [46.241487, -1.090357],
                    ]"
                  >
                    <l-popup>
                      lol
                    </l-popup>
                  </l-rectangle>

                </l-map>
              </div>


        </div>

      </div>

    </div>

    <div v-else-if="crash" class="row fullScreen justify-content-center align-items-center">
      
        <span class="sr-only">Could not load the APIs.</span>

    </div>

    <div v-else class="row fullScreen justify-content-center align-items-center">
      <div class="spinner-border text-warning" role="status">
        <span class="sr-only">Loading....</span>
      </div>
    </div>


</template>

<script>

import "leaflet/dist/leaflet.css"
import {
  LMap,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";

import axios from 'axios';
export default {
  name: 'TrackerMap',
  components: {
        LMap,
        LTileLayer,
        LMarker,
        LControlLayers,
        LTooltip,
        LPopup,
        LRectangle,
  },
  data(){
      return{
          ipAddress: null,
          ipData: null,
          errorReceived: null,
          ipInput: null,
          zoom: 6,
          iconWidth: 25,
          iconHeight: 40,
          lat: null,
          lang: null,
          error:false,
          crash: false

      };
  },
  created(){
          
          console.log("This is created.")
          //fetching network IP using API
          var api = "https://api.ipify.org/?format=json"
          
          axios.get(api).then((response) => {
            
            //setting up the ip to the varible
            var ip = response.data.ip
            this.ipAddress = ip
            this.ipInput = ip

            //passing the IP to get the information from another API
            this.getIpAddressData(ip)
            

          }).catch((err)=>{
            
            console.log("Error IPDATA FETCH", err)
            this.crash = true
          })


  },
  computed: {
      iconSize() {
        return [this.iconWidth, this.iconHeight];
      },
    },
  methods: {
      sendInfo(){
        this.getIpAddressData(this.ipInput)
        console.log("Called ", this.ipAddress)
      },
      getIpAddressData(ip){
          
          var ipapi = "https://ipapi.co/"+ip+"/json/"
          
          //fetching IP info using API
          axios.get(ipapi).then((res)=>{
            
            //logging the info data to console  
            console.log(res.data)
            if(res.data.error){
              this.error = res.data.error
            }else{
              //setting up the data to variables
              this.ipData = res.data
              this.lat = res.data.latitude
              this.lang = res.data.longitude
              return true              
            }

          }).catch((err)=>{

            console.log("There is an error fetching ipdata.", err)
            return false
          })
      },

      log(a) {
            console.log(a);
          },

      

  },
  
}
</script>

<style scoped>
body{
  color:white;
}
.banner{
  background:#303C55;
  padding-top:30px;
}
.ipData{

  color:white;
}
.fa{
  margin:5px;
  font-size:16px;
  color:orange;
}
.iconwithData{
    font-size:18px;
    padding:10px;
    background:green;
    border-radius:20px;
    display:inline;

}
.badgeData{
  margin:5px;
}
.IP{
  color:orange;
}
.fullScreen{
  position:fixed;
  width:100%;
  height:100%;
}
</style>
