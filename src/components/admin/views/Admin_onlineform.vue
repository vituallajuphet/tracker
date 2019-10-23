<template>
    <div class="container">
             <div class="card">
        <div class="card-header">
          <i class="fa fa-wpforms"></i> SMTP List
             <span class=pull-right><a @click="refreshForm()" href="javascript:;"><i class="fa fa-refresh"></i> Refresh</a></span>
             <button @click="addOnlineform()" class="btn btn-primary pull-right"><i class="fa fa-plus"></i> Add new</button>
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
                        <th>Action</th>
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
                         <td class="action_btns">
                           
                            <a @click="gotoformEdit(key.id)" href="javascript:;"><i class="fa fa-edit"></i></a>
                            <a @click="deleteForm(key.id)" href="javascript:;"><i class="fa fa-trash"></i></a>
                            
                        </td>
                    </tr>
                    <tr v-if="loading">
                        <td colspan="7">
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
  name: 'onlineform',
    mounted(){
        this.refreshForm()
    },
  methods:{
     convertedDate(date){ 
            let dt = new Date(date)
            return  dt.getFullYear() +"-" +((dt.getMonth().toString().length == 1) ? "0"+(dt.getMonth()+1): (dt.getMonth()+1 )) +"-"+((dt.getDate().toString().length == 1) ? "0"+(dt.getDate()): (dt.getDate() ))
     },
     refreshForm(){
           this.$store.dispatch('onlineforms/get_all_forms').then((resp)=>{
            console.log(resp)
            this.loading = false
         }).catch((err)=>{
              console.log(err)
        })
    },
    addOnlineform(){
        this.$router.push({name:"admin_add_onlineform"})
    },
    gotoformEdit(id){
         this.$router.push({name: 'admin_edit_onlineform', params:{id:id}});
    },
    deleteForm(id){
        let con = confirm("Are you sure to delete this data?")

        if(con){
             let userInfo  = this.$store.getters["users/getUserInfo"];
             let frmData = {
                   id:id,
                   token: userInfo.token,
                   user_id:userInfo.user_id,
                   user_typ:userInfo.typ,
               }
       
             let fdata = this.formData(frmData);
             this.$store.dispatch("onlineforms/delete_forms", fdata).then((resp)=>{
                 this.refreshForm()
             }).catch((err)=>{
                 console.log(err)
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
  
  },
  computed : {
      getAllforms(){
          return this.$store.getters['onlineforms/getforms']
          
      }
      
  },
  data(){
      return {
          hosting_data :[],
          loading : true
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
   .action_btns{text-align: center}
 .action_btns a{display:inline-block;vertical-align:top;margin: 0 4px}
 .action_btns a:last-child{color: rgb(200, 58, 58)}
  .card-header .btn{line-height: 0.5;margin-right: 15px;} 
  .loading{text-align: center;display: block;}
  .loading img{width: 26px; display: inline-block; vertical-align: top; margin-right: 12px;}
</style>
