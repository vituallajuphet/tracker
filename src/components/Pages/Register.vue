<template>
    <div>
       <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Create Account</h5>
             <figure>
              <img :src="require('@/assets/user_icon.png')" alt="logo">
            </figure>
            <form class="form-signin" @submit.prevent="saveAccount()">
              <div class="form-label-group">
                   <label for="firstname">First Name</label>
                <input v-model="userdata.fname" type="text" id="firstname" class="form-control" required autofocus>
               
              </div>
              <div class="form-label-group">
                  <label for="lastname">Last Name</label>
                <input v-model="userdata.lname" type="text" id="lastname" class="form-control" required autofocus>
                
              </div>
              <div class="form-label-group">
                  <label for="email">Email address</label>
                  <input v-model="userdata.email" type="email" id="email" class="form-control" required autofocus>
                
              </div>
              <div class="form-label-group"><label for="password">Password</label>
                <input v-model="userdata.password" type="password" id="password" class="form-control"  required>
                
              </div>
              <button class="btn btn-lg btn-success btn-block btn_register" type="submit">Register Account <i class="fa fa-arrow-circle-right"></i></button>    
               <div class="form-label-group savemsg" :class="{'err' : hasErr}">
                  {{savemsg}}
              </div>        
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template> 

<script>
export default {
  name: 'register',
  data (){
      return {
          userdata:{
              fname:"",
              lname:"",
              email:"",
              password:""
          },
          savemsg:"",
          hasErr :false
      }
  },
  methods:{
      saveAccount (){
        let formData = this.formData(this.userdata);
        this.$store.dispatch('users/createuser_accnt', formData).then((resp)=>{
          if(resp.code == 200){
            this. savemsg ="Registration Success"
            this.hasErr = false
            this.userdata.fname=""
            this.userdata.lname=""
            this.userdata.email=""
            this.userdata.password=""
          }
          else{
            this. savemsg = "Registration Failed!"
            this.hasErr = true
          }
        }).catch((err)=>{
          console.log(err)
          this. savemsg = "Registration Failed, "+ err.message
          this.hasErr = true
        })
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
 .btn_register{margin: 10px 0 0}
  .card-body figure{max-width: 117px;margin: 0 auto 15px;text-align: center}
    .card-body figure img{width: 100%}
  .savemsg{text-align: center; margin: 11px 0 0; color: #099809;}
  .err{color: red}
</style>
