<template>
  <div class="hello">
    I am a Tracker Map
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: 'TrackerMap',
  created(){
    console.log("This is created.")
    console.log(window.location.hostname)
    this.axios.get("https://api.ipify.org/?format=json").then(res=>{
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
