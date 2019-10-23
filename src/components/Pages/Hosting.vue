<template>
    <div class="container">
         <div class="card">
        <div class="card-header">
            Our Hosting List
             <span class=pull-right><a @click="refreshHosting()" href="javascript:;"><i class="fa fa-refresh"></i> Refresh</a></span>

        </div>
        <div class="card-body">
              <table class="table table-bordered  ">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Host ID</th>
                        <th>Host Name</th>
                        <th>Host IP Address</th>
                        <th>Date Added</th>
                    </tr>
                </thead>
                <tbody>
                     <tr  v-for="(key) of getAllHosting.data" :key="key.id">
                        <td>{{key.id}}</td>
                        <td><strong>{{key.hosting_name}}</strong></td>
                        <td>{{key.hosting_ip}}</td>
                        <td>{{ convertedDate(key.created_date)}}</td>
                    </tr>
                </tbody>
                </table>
                <div class="err"> <i class="fa fa-lock"></i> Admin only can modify this data</div>
        </div>
        </div>  
               
    </div>
</template> 

<script>
export default {
  name: 'hosting',
    mounted(){
      this.$store.dispatch('hosting/get_all_host').then((resp)=>{
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
      refreshHosting(){
           this.$store.dispatch('onlineforms/get_all_forms').then((resp)=>{
            console.log(resp)
         }).catch((err)=>{
              console.log(err)
        })
        }  
  },
  computed : {
      getAllHosting(){
          return this.$store.getters['hosting/getHostings']
          
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
  /* textarea{resize: none}
  .smtp, .hsting{width: 85%;display: inline-block;vertical-align: top}
  .btn-search-smtp{color:#fff!important;margin-left: 5px} */
   .table td, .table th { padding: 6px 5px; }
 .table{font-size: 15px}
 .err{color:#d85050}
  .table td, .table th { padding: 6px 5px; }
 .table{font-size: 15px}
</style>
