<template>
    <div class="container">
             <div class="card">
        <div class="card-header">
            SMTP Setting list
             <span class=pull-right><a @click="refreshForm()" href="javascript:;"><i class="fa fa-refresh"></i> Refresh</a></span>
        </div>
        <div class="card-body">
           <table class="table table-bordered  ">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th>Mail Method</th>
                        <th>SMTP Server</th>
                        <th>SMTP User</th>
                        <th>SMTP Password</th>
                        <th>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(key) of getAllforms.data" :key="key.id">
                        <td>{{key.id}}</td>
                        <td>{{key.mail_method}}</td>
                        <td>{{key.smtp_server}}</td>
                        <td>{{key.smtp_user}}</td>
                        <td>{{key.smtp_password}}</td>
                        <td>{{ convertedDate(key.date_added)}}</td>
                    </tr>
                </tbody>
                </table>
                 <div class="err"><i class="fa fa-lock"></i> Admin only can modify this data</div>
        </div>
        </div>  
    </div>
</template> 

<script>
export default {
  name: 'onlineform',
    mounted(){
            this.$store.dispatch('onlineforms/get_all_forms').then((resp)=>{
            console.log(resp)
         }).catch((err)=>{
              console.log(err)
        })
    },
  methods:{
     convertedDate(date){ 
            let dt = new Date(date)
            return  dt.getFullYear() +"-" +((dt.getMonth().toString().length == 1) ? "0"+(dt.getMonth()+1): (dt.getMonth()+1 )) +"-"+((dt.getDate().toString().length == 1) ? "0"+(dt.getDate()): (dt.getDate() ))
     },
     refreshForm(){
           this.$store.dispatch('onlineforms/get_all_forms').then((resp)=>{
            console.log(resp)
         }).catch((err)=>{
              console.log(err)
        })
        } 
  },
  computed : {
      getAllforms(){
          return this.$store.getters['onlineforms/getforms']
          
      }
      
  },
  data(){
      return {
          hosting_data :[]
      }
  }
}
</script>

<style scoped>
  .card{margin-top: 30px}
  .btn-can{ margin-left: 10px}
   .table td, .table th { padding: 6px 5px; }
 .table{font-size: 15px}
  .err{color:#d85050}
  /* textarea{resize: none}
  .smtp, .hsting{width: 85%;display: inline-block;vertical-align: top}
  .btn-search-smtp{color:#fff!important;margin-left: 5px} */
</style>
