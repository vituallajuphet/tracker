<template>
    <div class="container">
        <bread />

        <div class="card">
    <div class="card-header">
        <i class="fa fa-pencil"></i>  SMTP Information
    </div>
    <div class="card-body">
        <div class="formcont" v-if="hasdata">
             <form @submit.prevent="updateSmtp()">
        <div class="form-row">
            <div class="form-group col-md-6">
            <label for="accname">Account Name <span class="reqq">*</span></label>
            <input v-model="formInputs.account_name" required type="text" class="form-control" id="inputEmail4" placeholder="Account Name">
            </div>
            <div class="form-group col-md-6">
                <label for="accname">Task Url <span class="reqq">*</span></label>
                <input v-model="formInputs.task_url" required type="text" class="form-control" id="inputEmail4" placeholder="Enter Task Url">
                </div>
            
            <div class="form-group col-md-6">
                <label for="hmtp">Online Form SMTP <span class="reqq">*</span></label>
                <input v-model="formInputs.smtp_used" required v-if="!isformshown" type="text" class="form-control smtp" id="hmtp" placeholder="Enter Online form SMTP">
                <select v-model="formInputs.smtp_used" required v-if="isformshown" id="" class="form-control smtp">
                    <option v-for="(key) of getAllforms.data" :key="key.id">{{isNAN(key.smtp_user)}}</option>
                </select>
                <a @click="showForm()" type="button" class="btn btn-primary btn-search-smtp"><i class="fa" :class="{'fa-close': isformshown, 'fa-search': !isformshown }"></i></a>
            </div>
            <div class="form-group col-md-6">
                <label for="hosting">Hosting Name <span class="reqq">*</span></label>
                <input v-model="formInputs.hosting" required v-if="!isHostshown" type="text" class="form-control hsting" id="hosting" placeholder="Enter Hosting">
                <select v-model="formInputs.hosting" required v-if="isHostshown" id="" class="form-control smtp">
                    <option v-for="(key) of getAllHosting.data" :key="key.id">{{key.hosting_name+" - "+key.hosting_ip}}</option>
                </select>
                <a @click="showHost()" type="button" class="btn btn-primary btn-search-smtp"><i class="fa" :class="{'fa-close': isHostshown, 'fa-search': !isHostshown }"></i></a>
            </div>
            
        </div>
        <div class="form-row">
            <div class="form-group col-md-3">
                <div class="form-group purple-border">
                <label for="exampleFormControlTextarea4">PDQA Option <span class="reqq">*</span></label>
                    <select v-model="formInputs.PDQA" required class="form-control smtp">
                    <option value="PDQA">PDQA</option>
                    <option value="REPDQA">REPDQA</option>
                </select>
                </div>
            </div>
        
        </div>
        <div class="form-row">
            <div class="form-group col-md-12">
                <div class="form-group purple-border">
                <label for="exampleFormControlTextarea4">Remarks</label>
                <textarea v-model="formInputs.remarks"  class="form-control" id="exampleFormControlTextarea4" rows="3"></textarea>
                </div>
            </div>
        
        </div>
        <div v-if="dspMsg" class="form-row">
            <div class="form-group col-md-12 resmsg" :class="{'errs': hasErr}">{{responseMsg}}   </div>
            
        </div>

        
        <button type="submit" class="btn btn-success">Update <i class="fa fa-check"></i></button>
        <button @click="clearAll(formInputs)" type="button" class="btn btn-danger btn-can">Cancel <i class="fa fa-close"></i></button>
        </form>
        </div>
        <div class="nodata_cont" v-else>
            <h5 class="nodata">No data found or you are not allowed to modify this SMTP Data</h5>
        </div>
                    <!-- form end -->
    </div>     
 
    </div>   
    </div>
</template> 

<script>
import bread from '@/components/Pages/includes/Breadcrumbs.vue'
import { setTimeout } from 'timers';

export default {
  name: 'vuewsmtp',
  components:{
      bread
  },
  data(){
     return {
          dsplayForm: false,
          dsplayHost: false,
          onlineformdata:[],
          formInputs:{
              remarks:"",
              account_name:"",
              smtp_used :"",
              hosting :"",
              user_id :"",
              token:"",
              task_url:"",
              PDQA:""
          },
          dspMsg:false,
          hasErr:false,
          responseMsg:"Successfully Saved!",
          hasdata : true
      }
  },
 props:{
     id:{
         required:true
     }
 },
mounted(){
this.$store.dispatch('onlineforms/get_all_forms').then((resp)=>{ console.log(resp) }).catch((err)=>{ console.log(err) })

this.$store.dispatch('hosting/get_all_host').then((resp)=>{ console.log(resp) }).catch((err)=>{ console.log(err) })

this.getData()

}, 
computed :{
     isformshown(){
          return this.dsplayForm
      },
      isHostshown(){
          return this.dsplayHost
      },
      getAllforms(){
          return this.$store.getters['onlineforms/getforms']
          
      },
      getAllHosting(){
          return this.$store.getters['hosting/getHostings']
          
      },
      getUseId(){
         let data =   this.$store.getters['users/getUserInfo']
         return data.user_id
      },
    getUserToken(){
         let data =  this.$store.getters['users/getUserInfo']
         return data.token
      }
},
methods: {
      updateSmtp(){
          let con = confirm("Are you sure to update this data?")
          
          if(con){
              this.formInputs.user_id = this.getUseId
               this.formInputs.token = this.getUserToken
              this.formInputs.smpt_id = this.$route.params.id
              let formdata = this.formData(this.formInputs);
              this.$store.dispatch('smtp/update_smtp', formdata).then((resp)=>{
                  this.responseMsg ="Successfully updated!";
                  this.hasErr = false;
                  this.dspMsg = true;
                  this.clearAll(this.formInputs)
              }).catch((err)=>{
                  console.log(err)
                  this.responseMsg ="update failed failed!";
                  this.hasErr = true;
                  this.dspMsg = true;
              })

          }
      },
      showForm(){
          this.dsplayForm = !this.dsplayForm
      },
      showHost(){
        this.dsplayHost = !this.dsplayHost  
      },
      isNAN(smtp){
          if(smtp == "N/A"){
              return "PHPMAIL"
          }else{
              return smtp;
          }
      },
     getData(){
        this.$store.dispatch('smtp/get_all_smtp').then((resp) =>{
         
        let id = this.$route.params.id
        
        let datas = this.$store.getters['smtp/getSpecificSmtp'](id)
        if(datas){
            setTimeout(() => {
             let userID = this.$store.getters['users/getUserid']
            if(datas.user_id == userID){
                this.formInputs.account_name = datas.account_name
                this.formInputs.smtp_used = datas.smtp_used
                this.formInputs.hosting = datas.hosting
                this.formInputs.remarks = datas.remarks
                this.formInputs.task_url = datas.task_url
                this.formInputs.PDQA = datas.PDQA
                this.hasdata = true;
                }
                else{
                    this.hasdata = false;
                }
        }, 1000);
        }
        else{
 this.hasdata = false;
        }

     }); 
     },
     clearAll(obj){
          for (const key in obj) {
              if (obj.hasOwnProperty(key)) {
                 obj[key] ="" 
              }
          }
          setTimeout(() => {
                this.$router.push({name:"home"})
          }, 1000);
      },
      formData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    }
},
watch:{

}

}
</script>


<style scoped>
  .container{margin-top: 20px}

 .container{margin-top: 30px}
  .card{margin-top: 30px}
  .btn-can{ margin-left: 10px}
  textarea{resize: none}
  .smtp, .hsting{width: 85%;display: inline-block;vertical-align: top}
  .btn-search-smtp{color:#fff!important;margin-left: 5px}

.reqq{color: red;}
.resmsg{color: green;text-align: center}
 .errs{color: rgb(189, 176, 176)!important}
 .nodata{color:rgb(221, 88, 88);}
</style>
