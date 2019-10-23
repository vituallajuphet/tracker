<template>
    <div class="container">
         <bread /> 
         <div class="card">
            <div class="card-header">
                <i class="fa fa-database"></i>  Edit SMTP Information
            </div>
            <div class="card-body">
                    <form @submit.prevent="updateonlineforms()">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputName">Mail Method <span class="reqq">*</span></label>
                          
                            <select v-model="frm.mail_method"  required  id="" class="form-control hstingsel">
                                <option value="PHPMAIL">PHPMAIL</option>
                                <option value="SMTP">SMTP</option>
                                <option value="Others">Others</option>
                            </select>
                     
                           
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputName">SMTP Server <span class="reqq">*</span></label>
                          
                            <select :disabled="isnotPHPmail ? false : true" v-model="frm.smtp_server"  required  id="" class="form-control hstingsel">
                                <option value="secure.emailsrvr.com">secure.emailsrvr.com</option>
                                <option value="smtp.mailgun.org">smtp.mailgun.org</option>
                                <option value="smtp.mailgun.org">Others</option>
                                <option value="Others">N/A</option>
                            </select>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="hostingReemarks">SMTP Username</label>
                                <input v-model="frm.smtp_user"  type="text" class="form-control"  placeholder="Enter SMTP username">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="hostingReemarks">SMTP Password</label>
                                <input v-model="frm.smtp_password"   :type="isPasshown ? 'text' : 'password'" class="form-control" id="inputName" placeholder="Enter SMTP Password">
                                <a @click="showpass()" type="button" class="btn btn-primary search_host"><i class="fa" :class="{'fa-eye-slash': isPasshown, 'fa-eye': !isPasshown }"></i></a>
                            </div>

                            <div class="form-group col-md-12">
                                 <label for="hostingReemarks">Remarks</label>
                                <textarea v-model="frm.remarks" class="form-control" id="hostingReemarks" rows="3"></textarea>
                            </div>
                            <div class="form-group col-md-12">
                               <span class="msg" v-if="showMsg" :class="{'err':hasErr}">{{alertMsg}}</span>
                            </div>
                            <button type="submit" class="btn btn-success">Update <i class="fa fa-check"></i></button>
                            <button  @click="backOnlineform()" type="button" class="btn btn-danger btn-can">Cancel <i class="fa fa-close"></i></button>
                           
                     </div> 
                    </form>
            </div>     
         </div>
    </div>
</template> 

<script>
 import bread from '@/components/Pages/includes/Breadcrumbs.vue'
export default {
  name: 'admin_form_edit',
   data(){
    return {
        frm:{
           mail_method:"",
           smtp_server:"",
           smtp_user:"",
           smtp_password:"",
           remarks:""
        },
        allforms:[],
        showMsg: false,
        alertMsg:"",
        hasErr: false,
        isPasshown: false,
        isnotPHPmail: false
    }
  },
mounted(){
    this.clearTxt()
    this.refresForms()
},
  methods:{
   updateonlineforms(){
       let frmSearch =  {
           smtp_user:this.frm.smtp_user,
           smtp_server:this.frm.smtp_server,
           mail_method:this.frm.mail_method
       }
      
       let res = this.$store.getters["onlineforms/getIsExist"](frmSearch)
       

     if(this.frm.mail_method =="PHPMAIL" && this.frm.smtp_server =="N/A" && (this.frm.smtp_user == "" && this.frm.smtp_password =="" ) ){
         this.showMsg = true;
           this.hasErr = true;
           this.alertMsg = "This PHPMAIL is already used!"
         return false
     }


       if(res.length == 0){
           let con = confirm("Are you sure to update this data?")
           if(con){
               let userInfo  = this.$store.getters["users/getUserInfo"];
                this.frm.token = userInfo.token
                this.frm.user_id = userInfo.user_id
                this.frm.user_typ = userInfo.typ
                this.frm.id = this.$route.params.id
                
               let fdata = this.formData(this.frm);
            

               this.$store.dispatch("onlineforms/update_form", fdata).then((resp)=>{
                   if(resp.code == 200){
                       this.showMsg = true;
                        this.hasErr = false;
                        this.alertMsg = "Updated successfully!"
                       setTimeout(() => {
                        this.clearTxt()
                      }, 2000);  
                   }else{
                      this.showMsg = true;
                        this.hasErr = true;
                        this.alertMsg = resp.message 
                   }
               }).catch((err)=>{
                   this.showMsg = true;
                        this.hasErr = true;
                        this.alertMsg = err.message 
               })
               
           }
       }
       else{
           this.showMsg = true;
           this.hasErr = true;
           this.alertMsg = "This SMTP details is already exist!"
       }
   },
   backOnlineform(){
        this.$router.push({name:"admin_form"})
        this.clearTxt()
   },
showpass(){
  this.isPasshown =!this.isPasshown
},

   formData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    } ,
   clearTxt(){
        this.frm.mail_method=""
        this.frm.smtp_server=""
        this.frm.smtp_user=""
        this.frm.mail_method=""
        this.frm.smtp_password=""
        this.frm.remarks=""

        this.showMsg = false;
        this.hasErr = false;
        this.alertMsg = ""
   },
   refresForms(){
            let id = this.$route.params.id
            if(id == undefined){
               this.$router.push({name:"admin_form"})
            }
    
        this.$store.dispatch('onlineforms/get_all_forms').then((resp)=>{
          
            let res = this.$store.getters["onlineforms/getspecificSmtp"](id)
             this.frm.mail_method= res.mail_method
            this.frm.smtp_server=res.smtp_server
            this.frm.smtp_user=res.smtp_user
            this.frm.smtp_password=res.smtp_password
            this.frm.remarks= res.remarks
      }).catch((err)=>{
           console.log(err)
      })
   },
    showform(){
        this.dsplayForm = !this.dsplayForm
      
   },
  },
  computed : {
    

  },
  watch:{   
      "frm.mail_method":function(val){
        if(val == "PHPMAIL"){
            this.frm.smtp_server= "N/A"
            this.isnotPHPmail = false;
            

        }
        else{
            this.isnotPHPmail = true;
        }
      }
  },
   components:{
      bread
  },
}
</script>

<style scoped>
.container{margin-top: 30px}
.btn-can{ margin-left: 10px}
.reqq{color: red;}
.msg{color: green;display: block;text-align: center}
.err{color: red!important}

#inputName{width: 85%; display: inline-block; vertical-align: top;}
.search_host{display:inline-block;vertical-align:top;color: #fff !important; margin-left: 5px;}

</style>
