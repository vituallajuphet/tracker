<template>
    <div>
       <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In Account</h5>
            <figure>
              <img :src="require('@/assets/user_icon.png')" alt="logo">
            </figure>
            <form class="form-signin" @submit.prevent="loginAccount()">
              <div class="form-label-group">
                  <label for="inputEmail">Email address</label>
                <input v-model="emailAdd" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
              </div>
              <div class="form-label-group">
                  <label for="inputPassword">Password</label>
                <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
              </div>
              <button class="btn btn-lg btn-primary btn-block btn_login" type="submit">Sign in <i class="fa fa-arrow-circle-right"></i></button>     
             <div v-if="errLogin" class="form-label-group errhere">
                  {{errMsg}}
              </div>
            </form>
            <div class="loadingDiv" v-if="loading">
               Logging in...  <img :src="require('@/assets/loadings.gif')" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template> 

<script>
import { setTimeout } from 'timers';
export default {
  name: 'login',
  data(){
      return {
          emailAdd: "",
          password: "",
          errLogin: false,
          errMsg:"",
          loading:false
      }
  },
 methods:{
     loginAccount(){
       this.loading = true
         let formData = this.formData({email:this.emailAdd,password:this.password });
            this.$store.dispatch('users/login_accnt', formData).then((resp) =>{
             if(resp.code == 200){
               setTimeout(() => {

                  this.errLogin = false
                  if(resp.typ != "admin"){
                    this.$router.replace({path:'/home'})
                  }
                  else{
                     this.$router.replace({name:'adminhome'})
                  }
                this.errLogin = false
                 this.loading = false
               }, 1000);
             }
            else{
              console.log(resp)
              this.errMsg = resp.message
              this.errLogin = true
              this.loading = false
            }
         }).catch((err)=>{
            if(err.code == 500){
              this.$router.replace({path:'/checkConnection'})
            }
            else{
              this.errMsg = err.message
              this.errLogin = true
            }
            this.loading = false
         });   
        
     
    },
     formData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    }
 },
  mounted(){
   
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn_login{margin:  10px 0 0}
    .card-body figure{max-width: 117px;margin: 0 auto 15px;text-align: center}
    .card-body figure img{width: 100%}
    .errhere{text-align: center; color: #d65454; margin: 15px 0 0;}
    .loadingDiv{text-align: center;margin: 10px 0 0 }
    .loadingDiv img{width: 25px;}
</style>
