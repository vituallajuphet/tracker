<template>
  <div id="app">
    <app-nav v-if="!isAdmin"></app-nav>
    <app-admin-nav v-else></app-admin-nav>
    <transition name="fade">
    <router-view default="{name: 'login'}"></router-view>
    </transition>
  </div>
</template>

<script>
import { setTimeout } from 'timers';


export default {
  name: 'app',
  data (){
    return {
      userinfos:[]
    }
  },
  mounted(){
  //  this.check_auth();
    
  },
  computed:{
    isLogin(){
           if(localStorage.getItem("tokenID")){
             return true
           }
           else{
              return false
           }
        },
        isAdmin(){
           let userData =  this.$store.getters["users/getUserInfo"]
           if(userData.typ == "admin"){
             return true
           }
            return false 
        }
  },
  methods:{
      // check_auth(rt){

      //    let tokendata = localStorage.getItem("tokenID")

      //    let formData = this.formData({token:tokendata});
      //     this.$store.dispatch('users/get_check_auth', formData).then((resp)=>{
      //       if(resp.code != 200){
      //         this.$route.push({path:'/login'})
      //       }
      //       else{
      //         let path = this.$route.fullPath;
      //         this.userinfos = this.$store.getters["users/getUserInfo"]
      //       //  check admin or users
      //         let checkPath = path.match(/admin/g)
      //         if(checkPath != null && this.userinfos.typ =="developer" ) {
      //           this.$router.push({name:"home"})
      //           console.log("not admin")
      //         }
      //         else if(checkPath == null && this.userinfos.typ =="admin"){
               
      //           console.log("not developer")
      //            this.$router.push({name:"adminhome"})
      //         }
      //         else{
      //           this.$router.push({path:rt})
      //         }
                                     
      //       }
      //     }).catch((err) =>{
      //       console.log(err)

      //     if(err.code == 200){
      //       this.$router.push({path:'/login'})
      //     }else{
      //     this.$router.push({path:'/checkconnection'})
      //     }
           
      //     })
      // },
 
    //   formData(obj) {
      
    //   for (var key in obj) {
    //     formData.append(key, obj[key]);
    //   }
    //   return formData;
    // }
  },
  // watch :{
  //   '$route'(to){
  //        console.log(to)
  //         if(to.name != "register" && to.name != "login"){
  //         this.check_auth(to.path)
  //      }

      
  //   }
  // }

}
</script>

<style>

</style>
