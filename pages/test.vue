<template>
  <div class="bg-gray-950">
    <div
      class="mx-auto flex min-h-screen max-w-7xl flex-col gap-9 bg-gray-950 px-10 py-8 text-sm text-neutral-400 md:gap-20 md:py-16">

      <header class="z-40 flex w-full items-center justify-between md:flex-row md:justify-between">
        <NuxtLink class=" hover:text-neutral-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M16 11h-2V9h2v2M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5m7 2H8v10h2V7m2 10h2v-4h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4v10Z" />
          </svg>
          <span class="text-xl font-semibold">
            Tracker
          </span>
        </NuxtLink>
        <nav role="navigation">
          <ul role="list" class="flex flex-row gap-2">
            <li class="hover:text-neutral-100 text-neutral-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
              </svg>
            </li>
          </ul>
        </nav>
      </header>

      <div class="mx-auto max-w-4xl" v-if="IP && ipInfo">
        <div class="flex items-center mb-6">
          <input type="text" placeholder="Enter IP Address" v-model="searchIP" class=" bg-gray-900 flex-grow p-2">
          <button id="track-btn" class="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            @click="getNewIpInfo(searchIP)">Track</button>
        </div>
        <h2 class="font-inter text-xl my-10 text-justify" v-if="ipInfo">
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
          whopping <TextOrange>{{ ipInfo.country_area }}</TextOrange> sq km of area and <TextOrange>{{
            ipInfo.country_population }}</TextOrange> fellow digital wanderers in <TextOrange>{{ ipInfo.country_name }}
          </TextOrange>! 🏞️

          Fancy,
          right? 😉
        </h2>

        <div class="w-full h-96" v-if="ipInfo.latitude && ipInfo.longitude">

          <LMap ref="map" :zoom="zoom" :center="[ipInfo.latitude, ipInfo.longitude]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
              layer-type="base" name="OpenStreetMap" />

            <!-- <LMarker :lat-lng="[ipInfo.latitude, ipInfo.longitude]">
              <LTooltip>
                {{ ipInfo.region }}
              </LTooltip>
            </LMarker> -->
          </LMap>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const routeIP = route.query.ip

console.log(routeIP)

const IP = ref()
const ipInfo = ref()
const searchIP = ref()
const zoom = ref(10)
const lat = ref()
const long = ref()
const map = ref()
const show = ref(false)
const inEU = "Oh, and by the way, you're in the EU 🇪🇺 (yes, GDPR territory!).";
const notInEU = "Oh, and by the way, you are not in the EU 🇪🇺 (sorry, no GDPR here!).";

onMounted(async () => {
  await startLoad()
  console.log(ipInfo.value)
})



async function getIpInfo(ip) {
  IP.value = ip
  const { data: info } = await useFetch(`https://ipapi.co/${ip}/json/`)
  show.value = false
  ipInfo.value = info.value
  lat.value = info.value.latitude
  long.value = info.value.longitude
  updateMap(info.value.latitude, info.value.longitude)
  console.log(info.value.latitude, info.value.longitude)
  return info.value
}

async function getIp() {
  const { data: ipAddr } = await useFetch('https://api.ipify.org/?format=json')
  IP.value = ipAddr.value.ip
  searchIP.value = ipAddr.value.ip
  return ipAddr.value.ip
}

async function startLoad() {
  if (routeIP) {
    IP.value = routeIP
    searchIP.value = routeIP
    ipInfo.value = await getIpInfo(routeIP)
  } else {
    IP.value = await getIp()
    if (IP.value) {
      ipInfo.value = await getIpInfo(IP.value)
    }
  }
}


async function getNewIpInfo(ip) {
  window.location = `/test?ip=${ip}`
}

function updateMap(latitude, longitude) {
  // if (map.value) {
  //   map.value.setView([latitude, longitude], zoom.value)
  // }
}

watch([lat, long], ([newLat, newLong]) => {
  if (newLat && newLong) {
    updateMap(newLat, newLong)
  }
})
</script>

<style scoped>
.leaflet-container {
  height: 100%;
  width: 100%;
}
</style>
