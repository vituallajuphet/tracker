<template>
    <div class="breadcrm">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link :to="getRoute.toRoute">{{getRoute.toRouteName}}</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{getRoute.curr}}</li>
        </ol>
        </nav>
    </div>
</template> 

<script>

export default {
  name: 'breadcrumbs',
  data (){
      return {
          userType:""
      }
  },
 computed:{
     getRoute(){
         if(this.$route.name == 'addsmtp'){
             return {
                 toRouteName:"Home",
                 toRoute:"/home",
                 curr:"Add SMTP"
             }
         }
       else if(this.$route.name == 'viewsmtp'){
             return {
                 toRouteName:"Home",
                 toRoute:"/home",
                 curr:"View SMTP"
             }
         }
      else if(this.$route.name == 'editsmtp'){
             return {
                 toRouteName:"Home",
                 toRoute:"/home",
                 curr:"Edit SMTP"
             }
         }
         else if(this.$route.name == 'admin_hosting_add'){
             return {
                 toRoute:"/admin/hosting",
                 toRouteName:"Hosting",
                 curr:"Add Hosting"
             }
         }
          else if(this.$route.name == 'admin_edit_hosting'){
             return {
                 toRoute:"/admin/hosting",
                 toRouteName:"Hosting",
                 curr:"Edit Hosting"
             }
         }
         else if(this.$route.name == 'admin_add_onlineform'){
             return {
                 toRoute:"/admin/onlineforms",
                 toRouteName:" OnlineForms",
                 curr:"Add new SMTP"
             }
         }
         else if(this.$route.name == 'admin_edit_onlineform'){
             return {
                 toRoute:"/admin/onlineforms",
                 toRouteName:" OnlineForms",
                 curr:"Edit SMTP"
             }
         }
         else if(this.$route.name == 'admin_edit_user'){

             return {
                 toRoute:"/admin/users",
                 toRouteName:"Registered User",
                 curr:"Edit User Information"
             }
         }
         else{
                 return this.$route.name
         }
     },
    
 },
 mounted(){
     this.userType = this.$store.getters["users/getUserInfo"]

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
