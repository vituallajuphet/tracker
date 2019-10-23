<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">


  <router-link class="navbar-brand" to="/home"> <img :src="require('@/assets/logo.png')" /></router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
<!-- str -->
<div v-if="issLogin && (hasconnected || hasAuth)" class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
       <router-link class="nav-link" to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/hosting">Hosting</router-link>
      </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/onlineform">Onlineform</router-link>
      </li>
      <li class="nav-item">

      </li>
    </ul>

  </div>
<!--end  -->
  <div class="collapse navbar-collapse" id="navbarText" >
    <ul class="navbar-nav mr-auto">
  
    </ul>
    <span class="navbar-text">
    <button v-if="!issLogin" @click="accbutton()"  class="btn btn-outline-primary my-2 my-sm-0" type="button"> <i class="fa fa-user"></i> {{navbutton}}</button>
    
   <span v-if="hasconnected">
      <span  v-if="issLogin" class="usrhere"><i class="fa fa-user-circle-o"></i> {{this.getFullname()}}</span>
    <span v-if="issLogin" class="profile_link"><router-link to="/profile">My Profile</router-link></span>

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
        navbutton:"",
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
    this.updatebutton(routename)


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
      accbutton(){
          this.$router.replace({name:this.toRoute})
      },
      updatebutton(btn){
          if(btn == "register"){
              this.navbutton = "Sign In"
              this.toRoute = 'login'
          }
          else if (btn == "login"){
              this.navbutton = "Create Account"
              this.toRoute = 'register'
          }
      },
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
        this.updatebutton(to.name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-light {
    background-color: #e7e7e7 !important;
}
.router-link-active{color: #000!important;text-decoration: underline}
.usrhere{margin-right: 20px}
.profile_link{margin-right: 15px;}
.profile_link a{text-decoration: none;color: rgba(0,0,0,.7)!important;}
.profile_link a:hover, .profile_link a.router-link-active{color: #000!important;text-decoration: underline}
</style>
