<template>
    <div>
       <div class="container">
        <div class="jumbotron">
            <h1 class="display-4">Page not found!</h1>
            <p class="lead">Please check the website url, it leads to this page if the address is wrong...</p>
            <hr class="my-4">
            <p>Press the button below to redirect to previous page</p>
            <p class="lead">
                <router-link class="btn btn-primary btn-lg" to="/home" role="button">Back <i class="fa fa-arrow-circle-o-left"></i></router-link>
            </p>
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
              password:"",
              type:"developer"
          }
      }
  },
  methods:{
  
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .jumbotron{text-align: center;background: none}
</style>
