<template>
    <div class="container">
         <div class="card">
        <div class="card-header">
            <i class="fa fa-database"></i> Admin Hosting Panel
             <span class=pull-right><a @click="refreshTable()" href="javascript:;"><i class="fa fa-refresh"></i> Refresh</a></span>
              <button @click="addHosting" class="btn btn-primary pull-right"><i class="fa fa-plus"></i> Add new</button>

        </div>
        <div class="card-body">
              <table class="table table-bordered  ">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Host ID</th>
                        <th>Host Name</th>
                        <th>Host IP Address</th>
                        <th>Date Added</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                     <tr v-for="(key) of getAllHosting.data" :key="key.id">
                        <td>{{key.id}}</td>
                        <td><strong>{{key.hosting_name}}</strong></td>
                        <td>{{key.hosting_ip}}</td>
                        <td>{{ convertedDate(key.created_date)}}</td>
                        <td class="action_btns">
                          
                            <a @click="gotoeditHosting(key.id)" href="javascript:;"><i class="fa fa-edit"></i></a>
                            <a @click="deletehosting(key.id)" href="javascript:;"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="5">
                            <span class="loading"><img :src="require('@/assets/loadings.gif')" />Loading, Please wait...</span>
                        </td>
                    </tr>
                </tbody>
                </table>
               
        </div>
        </div>  
               
    </div>
</template> 

<script>
export default {
  name: 'hosting',
    mounted(){
      this.refreshTable()
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
     },
     addHosting(){
         this.$router.replace({name:"admin_hosting_add"})
     },
     gotoeditHosting(id){
         this.$router.push({name: 'admin_edit_hosting', params:{id:id}});
     },
     deletehosting(id){
         
         let con = confirm("are you sure to delete this data?")
         if(con){
             let userInfo  = this.$store.getters["users/getUserInfo"];
             let frmData = {
                   id:id,
                   token: userInfo.token,
                   user_id:userInfo.user_id,
                   user_typ:userInfo.typ,
               }
       
             let fdata = this.formData(frmData);
             this.$store.dispatch("hosting/delete_hosting", fdata).then((resp)=>{
                 this.refreshTable()
             }).catch((err)=>{

             })
         }
     },
     formData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    },
    refreshTable(){
        this.$store.dispatch('hosting/get_all_host').then((resp)=>{
            console.log(resp)
            this.loading = false;
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
          hosting_data :[],
          loading:true
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

 .action_btns{text-align: center}
 .action_btns a{display:inline-block;vertical-align:top;margin: 0 4px}
 .action_btns a:last-child{color: rgb(200, 58, 58)}

 .card-header .btn{line-height: 0.5;margin-right: 15px;} 
 .loading{display: block;text-align: center}
  .loading img{width: 26px; display: inline-block; vertical-align: top; margin-right: 12px;}
</style>
