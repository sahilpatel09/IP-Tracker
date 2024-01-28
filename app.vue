<template>
  <div class="bg-gray-950">
    <div
      class="mx-auto flex min-h-screen max-w-7xl flex-col gap-9 bg-gray-950 px-10 py-8 text-sm text-neutral-400 md:gap-20 md:py-16">

      <Header />

      <div class="mx-auto max-w-4xl" v-if="IP">
        <div class="flex items-center mb-6">
          <input type="text" placeholder="Enter IP Address" v-model="searchIP" class=" bg-gray-900 flex-grow p-2">
          <button id="track-btn" class="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            @click="getNewIpInfo(searchIP)">Track</button>
        </div>

        <h2 class="font-inter" v-if="ipInfo">
          Hey there, digital traveler! 🌍
          <br />

          So, you've landed in the digital realm of <TextOrange>{{ ipInfo.city }}</TextOrange>, <TextOrange>{{
            ipInfo.country_name }}</TextOrange> (or should I say <TextOrange>{{ ipInfo.region }}</TextOrange>?) with the
          IP <TextOrange>{{ ipInfo.ip }}</TextOrange>,
          cruising through the <TextOrange>{{ ipInfo.network }}</TextOrange> network. You're speaking in <TextOrange>{{
            ipInfo.languages }}</TextOrange> and spending those shiny
          <TextOrange>{{ ipInfo.currency }}</TextOrange>s! 🌟

          You're operating in the <TextOrange>{{ ipInfo.timezone }} ({{ ipInfo.utc_offset }})</TextOrange> timezone, and
          your digital postman, <TextOrange>{{ ipInfo.org }}</TextOrange>, is delivering those <TextOrange>{{
            ipInfo.version }}</TextOrange>
          packets right to your doorstep in the <TextOrange>{{ ipInfo.postal }}</TextOrange> postal zone! 📬

          {{ ipInfo.in_eu ? inEU : notInEU }}

          You're residing in a country with a
          whopping <TextOrange>{{
            ipInfo.country_area }}</TextOrange> sq km of area and <TextOrange>{{
    ipInfo.country_population }}</TextOrange> fellow digital wanderers in <TextOrange>{{
    ipInfo.country_name }}</TextOrange>! 🏞️

          Fancy,
          right? 😉


        </h2>

        <IPInfo class="hidden" :data="ipInfo" />


        <!-- <Map /> -->

        <!-- <div class="w-full h-96" v-if="ipInfo.latitude && ipInfo.longitude">
          <LMap ref="map" :zoom="zoom" :center="[ipInfo.latitude, ipInfo.longitude]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
              layer-type="base" name="OpenStreetMap" />

            <LMarker :lat-lng="[ipInfo.latitude, ipInfo.longitude]" draggable @moveend="log('moveend')">
              <LTooltip>
                {{ ipInfo.region }}
              </LTooltip>
            </LMarker>

          </LMap>
        </div> -->
        <Map2 />
      </div>
    </div>
  </div>
</template>
<script setup>

const IP = ref()
const ipInfo = ref({})
const searchIP = ref()
const zoom = ref(6)
const map = ref()
const lat = ref()
const long = ref()

const route = useRoute()
const routeIP = route.query.ip

const show = ref(false)

const inEU = "Oh, and by the way, you're in the EU 🇪🇺 (yes, GDPR territory!).";
const notInEU = "Oh, and by the way, you are not in the EU 🇪🇺 (sorry, no GDPR here!).";

async function getIpInfo(ip) {
  IP.value = ip
  const { data: info } = await useFetch(`https://ipapi.co/${ip}/json/`);
  show.value = false
  setTimeout(() => {

  }, 3000)
  ipInfo.value = info.value
  // lat.value = info.value.latitude
  // long.value = info.value.longitude
  return info.value
}

async function getIp() {
  const { data: ipAddr } = await useFetch('https://api.ipify.org/?format=json');
  IP.value = ipAddr.value.ip
  searchIP.value = ipAddr.value.ip
  return ipAddr.value.ip
}

async function startLoad(ip) {
  console.log("load 1")
  if (ip) {
    console.log("load 2")
    IP.value = ip
    searchIP.value = ip
    const data = await getIpInfo(ip)
    console.log("IP FOUND", data)
  } else {
    console.log("load 3")
    IP.value = await getIp()
    if (IP.value) {
      console.log("load 4")
      const data = await getIpInfo(IP.value)
      console.log("IP FOUND", data)
    }
  }
}

// watch: {
//   latLng(newVal){
//     this.mapObject.setLatLngs(this.latLng)
//   }
// }

onMounted(async () => {
  await startLoad()
  console.log(map.value)
})

function log(str) {
  console.log(str)
}

async function getNewIpInfo(ip) {
  // console.log("Go to"+ ip)
  // if(ip){
  //   navigateTo('/.?ip='+ip)
  // } else{
  //   window.location = '/'
  // }
  await startLoad(ip)

}
</script>