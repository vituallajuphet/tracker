<template>
    <div class="container">
         <bread /> 
         <div class="card">
            <div class="card-header">
                <i class="fa fa-database"></i> Update Hosting Information
            </div>
            <div class="card-body">
                    <form @submit.prevent="updatehost()">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                            <label for="inputName">Host Name <span class="reqq">*</span></label>
                            <input v-model="hostname" v-if="!isformshown"  required type="text" class="form-control" id="inputName" placeholder="Enter Hosting Name">
                            <select v-model="hostname" required v-if="isformshown" id="" class="form-control hstingsel">
                                <option v-for="hosting in hostings" :key="hosting">{{hosting}}</option>
                            </select>
                     
                            <a @click="showform()" type="button" class="btn btn-primary search_host"><i class="fa" :class="{'fa-close': isformshown, 'fa-search': !isformshown }"></i></a>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="accname">Host IP Address <span class="reqq">*</span></label>
                                <input v-model="ipaddress"   required type="text" class="form-control" id="inputEmail4" placeholder="Enter IP Address">
                            </div>
                            <div class="form-group col-md-12">
                                 <label for="hostingReemarks">Remarks</label>
                                <textarea v-model="remarks" class="form-control" id="hostingReemarks" rows="3"></textarea>
                            </div>
                            <div class="form-group col-md-12">
                               <span class="msg" v-if="showMsg" :class="{'err':hasErr}">{{alertMsg}}</span>
                            </div>
                            <button type="submit" class="btn btn-success">Update <i class="fa fa-check"></i></button>
                            <button  @click="clearTxt()" type="button" class="btn btn-danger btn-can">Cancel <i class="fa fa-close"></i></button>
                           
                     </div> 
                    </form>
            </div>     
         </div>
    </div>
</template> 

<script>
 import bread from '@/components/Pages/includes/Breadcrumbs.vue'
export default {
  name: 'admin_hosting_edit',
   data(){
    return {
        hostname:"",
        ipaddress:"",
        remarks:"",
        allhost:[],
        showMsg: false,
        alertMsg:"",
        hasErr: false,
        dsplayForm: false,
        hostings:["GoDaddy.com LLC","InMotion Hosting Inc.","Hostgator","Cloudways","Hostwinds","Hostinger","Bluehost","iPage","HostFav","DreamHost","Interserver","Namecheap","1&1","Fasthosts","GreenGeeks","Justhost","SiteGround","Host1Plus","Rackspace","Yahoo", "Others"]
    }
  },
mounted(){
    this.refreshHost()
},
  methods:{
   updatehost(){
       let hostData = {
           hosting_ip:this.ipaddress,
           hname:this.hostname,
       }
      
       let res = this.$store.getters["hosting/getIsExist"](hostData)
       if(res.length == 0){
           let con = confirm("Are you sure to save this data?")
           if(con){
               let userInfo  = this.$store.getters["users/getUserInfo"];
               let hostid  = this.$route.params.id
               let frmData = {
                   hosting_name: this.hostname,
                   hosting_ip: this.ipaddress,
                   remarks: this.remarks,
                   id:hostid,
                   token: userInfo.token,
                   user_id:userInfo.user_id,
                   user_typ:userInfo.typ,
               }

               let fdata = this.formData(frmData);
               
               this.$store.dispatch("hosting/update_hosting", fdata).then((resp)=>{
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
           this.alertMsg = "This hosting details is already exist!"
       }
   },
   
   formData(obj) {
      var formData = new FormData();
      for (var key in obj) {
        formData.append(key, obj[key]);
      }
      return formData;
    } ,
   clearTxt(){
        this.hostname=""
        this.ipaddress=""
        this.remarks=""
        this.showMsg = false;
        this.hasErr = false;
        this.alertMsg = ""
        this.$router.push({name:'admin_hosting'})
   },
   refreshHost(){
        if(this.$route.params.id == undefined){
           this.$router.push({name:'admin_hosting'})
        }
        else{
             this.$store.dispatch('hosting/get_all_host').then((resp)=>{
           console.log(resp.code)
           let id = this.$route.params.id
           let res = this.$store.getters["hosting/getspecificHostings"](id)
           this.hostname = res.hosting_name
            this.ipaddress= res.hosting_ip
            this.remarks= res.remarks
            }).catch((err)=>{
                console.log(err)
            })
        }

       
   },
    showform(){
        this.dsplayForm = !this.dsplayForm
      
   },
  },
  computed : {
    
   isformshown(){
          return this.dsplayForm
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
.hstingsel{width: 85%; display: inline-block; vertical-align: top;}
</style>
