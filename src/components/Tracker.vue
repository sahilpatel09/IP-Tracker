<template>

    <div class="container-fluid">
      <div class="row justify-content-center banner">
        <div class="col-md-8 col-sm-6">
          <form @submit.prevent="sendInfo">
              <input type="text" class="textField" name="ipinput" placeholder="IP Address" v-model="ipAddress" />
              <input type="submit" class="buttonSend" name="sendInfo" />

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

              <span class=" badgeData badge rounded-pill bg-primary">{{ipData.timezone}}</span>
              <span class=" badgeData badge rounded-pill bg-primary">{{ipData.country_tld}}</span>


              <span class=" badgeData badge rounded-pill bg-primary"><i>PostalCode : </i>{{ipData.postal}}</span>

              
            
            </div>
          </article>
        </div>

        <div class="col-md-6 col-sm-6">
            
        </div>

      </div>



    </div>



  <div class="hello" v-if="ipAddress">
    I am a Tracker Map for the IP {{ipAddress}}
    <div class="" v-if="ipData">
    {{ipData}}  
    </div>
  </div>
<!--   <div v-else>
    Somethign is Wrong
  </div> -->

</template>

<script>
import axios from 'axios';
export default {
  name: 'TrackerMap',
  data(){
      return{
          ipAddress: null,
          ipData: null,
          errorReceived: null
      };
  },
  methods: {
      getIpAddressData(ip){
          var ipapi = "https://ipapi.co/"+ip+"/json/"
          axios.get(ipapi).then((res)=>{
            
            console.log(res.data)
            this.ipData = res.data

          }).catch((err)=>{
            console.log("There is an error fetching ipdata.", err)
            return false
          })
      }
  },
  created(){
    console.log("This is created.")
    
      var api = "https://api.ipify.org/?format=json"
          axios.get(api).then((response) => {
            var ip = response.data.ip
            this.ipAddress = ip
            this.getIpAddressData(ip)
            console.log(ip)




          }).catch((err)=>{
            console.log("Error IPDATA FETCH", err)
          })


  }
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
</style>
