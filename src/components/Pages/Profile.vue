<template>
    <div class="container"> 
        <div class="card">
            <div class="card-header">
               <i class="fa fa-user"></i>  My Profile
            </div>
            <div class="card-body">
                <form action="" @submit.prevent="updatePassword()">
                     <div class="row">
                    <div class="col-md-3">
                        <div>First Name: </div><strong>{{userProfile.fname}}</strong>
                    </div>
                    <div class="col-md-3">
                       <div>Last Name: </div> <strong>{{userProfile.lname}}</strong>
                    </div>
                    <div class="col-md-3">
                       <div>Email: </div> <strong>{{userProfile.email}}</strong>
                    </div>
                    <div class="col-md-3">
                        <div>Position: </div><strong>{{userProfile.typ}}</strong>
                    </div>
                </div>
                <br><br>
     
                <div class="row">
                             <div class="col-md-4">
                        <div>Password: </div>
                        <input v-model="pass" type="password" required class="form-control">
                    </div>  
                     <div class="col-md-4">
                        <div>New Password: </div>
                        <input v-model="newpass" type="password" required class="form-control">
                    </div>  
                    <div class="col-md-4">
                        <div>Retype Password: </div>
                        <input v-model="repass" type="password" required class="form-control">
                    </div> 
                </div>
                <div class="row">
                    <div v-if="displayMsg" class="col-md-12 msgg" :class="{'errhere': hasErr}">
                        {{msg}}
                    </div>
                </div>
                <hr>
                <button type="submit" class="btn btn-primary">Apply Changes <i class="fa fa-check"></i></button>
                </form>

            </div>   
                
            </div>   
    </div>
</template> 

<script>
export default {
  name: 'profile',
  mounted(){
    this.userProfile =  this.$store.getters['users/getUserInfo']
   
  },
  data (){
      return {
          userProfile:{},
          pass:"",
          newpass:"",
          repass:"",
          displayMsg:false,
          hasErr:false,
          msg:""
      }
  },
  methods:{
      updatePassword(){
           let formData = this.formData( { token:localStorage.getItem("tokenID"), password:this.pass, newpassword:this.newpass, user_id: this.userProfile.user_id });
          if(this.repass == this.newpass){
              let conf = confirm("Are you sure to update?")
                if(conf) {
                    this.$store.dispatch('users/update_account',formData).then((resp)=>{
                        console.log(resp.data)
                        this.displayMsg =true
                        this.msg = "Updated Successfully!"
                        this.hasErr = false;
                        this.newpass ="";
                        this.pass ="";
                        this.repass ="";
                        
                    }).catch((err)=>{
                        this.msg = "Update failed!"
                        this.displayMsg =true
                        this.hasErr = true;
                        this.newpass ="";
                        this.pass ="";
                        this.repass ="";
                    })
                }
          }
          else{
             this.displayMsg =true
             this.msg = "Password doesnt match!";
             this.hasErr = true;
          }
         
      },
      formData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    }
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .card{margin-top: 20px}
  .card-body figure{max-width: 117px;margin: 0 auto 15px;text-align: center}
    .card-body figure img{width: 100%}
 .errhere{color:red!important;}
 .msgg{text-align: center;color:green;margin-top:10px}
</style>
