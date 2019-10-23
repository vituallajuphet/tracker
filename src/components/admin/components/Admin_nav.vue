<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">


  <router-link class="navbar-brand" to="/admin"> <img :src="require('@/assets/logo.png')" /></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
<!-- str -->
<div v-if="issLogin && (hasconnected || hasAuth)" class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
       <router-link class="nav-link" to="/admin/" exact=""><i class="fa fa-home"></i> Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/hosting"><i class="fa fa-server"></i> Manage Hosting</router-link>
      </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/admin/onlineforms"><i class="fa fa-wpforms"></i> Manage Onlineform</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/users"><i class="fa fa-users"></i> Registered Users</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/admin/system-logs"><i class="fa fa-list"></i> System Logs</router-link>
      </li>
      <li class="nav-item">
         <router-link class="nav-link" to="/admin/records"><i class="fa fa-tasks"></i> Records</router-link>
      </li>
    </ul>

  </div>
<!--end  -->
  <div class="collapse navbar-collapse" id="navbarText" >
    <ul class="navbar-nav mr-auto">
  
    </ul>
    <span class="navbar-text">

    
   <span v-if="hasconnected">
      <span  v-if="issLogin" class="usrhere"><i class="fa fa-user-circle-o"></i> {{this.getFullname()}}</span>
      <span v-if="issLogin" class="profile_link"><router-link to="/admin/profile">My Profile</router-link></span>

    <button v-if="issLogin" @click="logoutAcc()" class="btn btn-primary">Logout <i class="fa fa-share-square-o"></i> </button>
   </span>
    </span>
  </div>
</nav>

</template> 

<script>
import { setTimeout } from 'timers';
export default {
  name: 'login',
  data (){
      return{
        toRoute:"",
        userData:{}
      }
  },
  props: {

  },
  created(){
    this.userData = this.$store.getters['users/getUserInfo']
    
  },
  mounted(){
    let routename =  this.$route.name
 

  },
  computed:{
        issLogin(){
           if(this.$route.name =='login' || this.$route.name =='register'){
             return false
           }
           else{
              return true
           }
        },
        hasconnected (){
          return   this.$store.getters['users/getConnection']    
                
        },

        hasAuth(){
          return   this.$store.getters['users/get_auth']    

        }

  },
  methods:{
     
      logoutAcc(){ 
    
        this.$store.dispatch('users/logout_user').then((resp)=>{
            console.log(resp)
            if(resp.code == 200 && resp.message=="Logout success"){
              this.$router.push({path:'/login'})
            }
          }).catch((err)=>{
            console.log(err)
          })
      },
      getFullname(){
        return this.userData.fname +" "+this.userData.lname
      }

  },
  watch: {
    '$route' (to) {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-light {
    background-color: #171313  !important;
}
.router-link-active{color: #fff!important;text-decoration: underline}
.usrhere{margin-right: 20px}
.profile_link{margin-right: 15px;}
.profile_link a{text-decoration: none;color:#fff!important;}
.profile_link a:hover, .profile_link a.router-link-active{color: rgb(199, 192, 192)!important;text-decoration: underline}
.navbar-light .navbar-nav .nav-link{color: #fff}
.navbar-light .navbar-text { color: #fff; }

.navbar-light .navbar-nav .nav-link:hover{color:rgb(199, 195, 195);}

</style>
