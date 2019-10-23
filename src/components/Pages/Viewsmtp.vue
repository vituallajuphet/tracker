<template>
    <div class="container">
        <bread />

        <div class="card">
    <div class="card-header">
        <i class="fa fa-envelope"></i>  SMTP Information
    </div>
    <div class="card-body">
        <div v-if="smtps[0].account_name != ''">
             <div class="row">
                    <div class="col-md-6">
               
                        <div>Account Name: </div><strong>{{smtps[0].account_name}}</strong>
                    </div>
                    <div class="col-md-6">
                       <div>SMTP Used: </div> <strong>{{smtps[0].smtp_used}}</strong>
                    </div>
         </div>   
         <br>
         <div class="row">
                    <div class="col-md-6">
                       <div>Hosting: </div> <strong>{{smtps[0].hosting}}</strong>
                    </div>
                    <div class="col-md-6">
                        <div>Added By: </div><strong>{{smtps[0].fname +" "+smtps[0].lname}}</strong>
                    </div>       
       </div>
       <br>
       <div class="row">
           <div class="col-md-6">
                       <div>Date Added: </div> <strong>{{smtps[0].create_date}}</strong>
                    </div>
                    <div class="col-md-6">
                      
                    </div>  
       </div>
<br>
    <div class="row">
        <div class="col-md-12">
            <div>Task Url: </div><strong><a :href="smtps[0].task_url" target="_blank">{{smtps[0].task_url}}</a></strong>
        </div>
        <div class="col-md-12">
            <br>
            <div>Remarks: </div><strong>{{getRemarks(smtps[0].remarks )}}</strong>
        </div>
    </div>
              
        </div>  
        <div v-else>
            <h4 class="no_data">No records found!</h4>
        </div>
    </div>   
 
    </div>   
    </div>
</template> 

<script>
import bread from '@/components/Pages/includes/Breadcrumbs.vue'

export default {
  name: 'vuewsmtp',
  components:{
      bread
  },
  data(){
      return {
          smtps:[
              {
                  account_name:"",
                  fname:"",
                  lname:"",
                  smtp_used:"",
                  hosting:"",
                  create_date:"",
                  task_url:"",
                  remarks:"None"
              }
          ],
          datas:[]
      }
  },
 props:{
     id:{
         required:true
     }
 },
mounted(){
  this.getData()
}, 
computed :{

},
methods: {
    getData(){
        this.$store.dispatch('smtp/get_all_smtp').then((resp) =>{
         
        let id = this.$route.params.id
        this.smtps =   resp.data.filter(sm => sm.smpt_id == id)
     
     }); 
    },
    getRemarks(remarks){
        if(remarks == ""){
            return "None"
        }else{
            return remarks
        }
    }
},
watch:{

}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{margin-top: 20px}
  .no_data{color: #bf3b3b;}
</style>
