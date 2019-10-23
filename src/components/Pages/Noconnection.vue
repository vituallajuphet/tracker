<template>
    <div class="container"> 
        <div class="jumbotron">
  <h1 class="display-4"><i class="fa fa-globe   "></i> Can't connect to server error!</h1>
  <p class="lead">Please check the internet connection, check the apache server or database. If the issue still occured, please ask assistant from Mr. Juphet Vitualla for help. </p>
  <hr class="my-4">

  <p class="lead">
    <button @click="checkConnec()" class="btn btn-primary btn-lg">Reload</button>
  </p>
</div>
    </div>
</template> 

<script>
export default {
  name: 'noconnection',
  mounted(){
       this.checkConnec();
  }, 
  methods :{
      checkConnec(){
          this.$store.dispatch('users/checkConnection').then((resp)=>{
      
             if(resp == 200){
                 this.$router.push({path:'/home'});
             }
          }).catch((err) =>{
                  this.$router.push({path:'/checkconnection'});
          })
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .card{margin-top: 20px}
  .card-body figure{max-width: 117px;margin: 0 auto 15px;text-align: center}
    .card-body figure img{width: 100%}
 .jumbotron{margin-top: 20px}
</style>
