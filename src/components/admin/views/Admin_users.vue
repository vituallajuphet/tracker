<template>
    <div class="container">
         <div class="card">
        <div class="card-header">
            <i class="fa fa-users"></i> System Users list
             <span class=pull-right><a @click="getUsers()" href="javascript:;"><i class="fa fa-refresh"></i> Refresh</a></span>

             <span class="pull-right user_tabs">
                 <a @click="sortUsers('approved')" href="javascript:;"><i class="fa fa-user"></i> Approved <span class="badge">{{getApproves()}}</span></a>
                 <a  @click="sortUsers('pending')" h href="javascript:;"><i class="fa fa-user"></i> Pending <span class="badge">{{getPending()}}</span></a>

             </span>

        </div>
        <div class="card-body">
              <table class="table table-bordered  ">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>User Type</th>
                        <th>Email Address</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                     <tr v-for="(key) of alluser" :key="key.user_id" :class="{'pnding':key.approved== 0}">
                        <td>{{key.user_id}}</td>
                        <td><strong>{{key.fname}}</strong></td>
                        <td><strong>{{key.lname}}</strong></td>
                        <td><strong>{{key.user_type}}</strong></td>
                        <td><strong>{{key.email}}</strong></td>
                   

                        <td class="action_btns">
                    
                            <a @click="editUser(key.user_id)" title="edit" href="javascript:;"><i class="fa fa-edit"></i></a>
                            <a @click="approveUser(key.user_id)" title="approve" v-if="key.approved== 0" href="javascript:;"><i class="fa fa-check"></i></a>
                            <a @click="deleteUser(key.user_id)" title="delete" href="javascript:;"><i class="fa fa-trash"></i></a>
                        </td>

                    </tr>
                    <tr  v-if="!loading && alluser.length == 0">
                      <td colspan="8">
                         <span class="err no-found">No users found!</span>
                      </td>
                    </tr>
                    <tr v-if="loading">
                      <td colspan="8">
                         <span class="loading"><img :src="require('@/assets/loadings.gif')" />Loading, Please wait...</span>
                      </td>
                    </tr>
                </tbody>
                </table>
               <div class="msg" :class="msgHasErr ? 'err':''">{{dsplayMSg}}</div>
        </div>
        </div>  
               
    </div>
</template> 

<script>
import { setTimeout } from 'timers';
export default {
  name: 'hosting',
  data(){
    return{
        alluser:[],
        loading:true,
        dsplayMSg:"",
        showMsg:false,
        msgHasErr:false,

    }
  },
    mounted(){
          setTimeout(() => {
                this.getUsers() 
          }, 1200);
    },
  methods:{
     getUsers(){
             let id = this.$store.getters["users/getUserid"]
            let formData = this.formData({token:localStorage.getItem("tokenID"),user_id:id});
            this.$store.dispatch('users/getAllUsers', formData).then((resp)=>{
                if(resp == 200){
                   this.alluser = this.$store.getters['users/getusers']
                  this.loading= false
                }  

            }).catch((err)=>{
                console.log(err)
            })
     },
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
    sortUsers(sortBy){
      if(sortBy == "approved"){
        this.alluser =  this.$store.getters["users/getAllApproved"];
      }
      else  if(sortBy == "pending"){
         this.alluser =  this.$store.getters["users/getAllPending"];
      }
    },

    editUser(id){
        this.$router.push({name: 'admin_edit_user', params:{id:id}});
    },
    
    approveUser(id){
      let con = confirm("Are you sure to approve this user?")
      if(con){
        let userInfo  = this.$store.getters["users/getUserInfo"];
        let userData = {
          to_approve_id:id,
          user_id:userInfo.user_id,
          token:userInfo.token,
          user_type:userInfo.typ
        }

        let formData = this.formData(userData);

        this.$store.dispatch('users/approveUser', formData).then((resp)=>{
            if(resp == 200){
              this.dsplayMSg="Approval Success!"
              this.msgHasErr=false;
              this.showMsg= true
              this.getUsers()
               this.resetREsult()
                
            }  
        }).catch((err)=>{
           this.dsplayMSg="Approval Failed"
              this.msgHasErr=true;
              this.showMsg= true
              this.getUsers()
              this.resetREsult()    
        })
      }
    },
    deleteUser(id){
      let con = confirm("Are you sure to removed this user?")
      if(con){
         let userInfo  = this.$store.getters["users/getUserInfo"];
         let userData = {
          delete_id:id,
          user_id:userInfo.user_id,
          token:userInfo.token,
          user_type:userInfo.typ
        }

        let formData = this.formData(userData);
        this.$store.dispatch('users/deleteUser', formData).then((resp)=>{
            if(resp == 200){
              this.dsplayMSg="Deleted Successfully!"
              this.msgHasErr=false;
              this.showMsg= true
              this.getUsers()
               this.resetREsult()
                
            }  
        }).catch((err)=>{
           this.dsplayMSg="Delete Failed"
              this.msgHasErr=true;
              this.showMsg= true
              this.getUsers()
              this.resetREsult()    
        })
      }
    },
    formData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    } ,
     getApproves(){
          return this.$store.getters["users/getApprovedusers"]
    },
    getPending(){
          return this.$store.getters["users/getPendingusers"]
    },
    resetREsult(){
       setTimeout(() => {
          this.dsplayMSg=""
          this.msgHasErr=false;
          this.showMsg= false
      }, 2500);
    }
     
  },
  computed:{
     
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

 .user_tabs{margin-right: 20px}
 
 .user_tabs a{display:inline-block;vertical-align:top;margin-left: 15px}
  .user_tabs a:first-child{color: #346834;}
  .user_tabs a:last-child{color: #716110}
  .pnding{background: #c1b784}
  .loading{text-align: center;display: block;}
  .msg{text-align: center; font-weight: bold; color: green;}
  .err{color:red!important}
  .no-found{text-align: center;display: block;}
.viewpass{text-align: center}
  .loading img{width: 26px; display: inline-block; vertical-align: top; margin-right: 12px;}
</style>
