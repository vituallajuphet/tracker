<template>
    <div class="container">
       <bread/>
         <div class="card">
        <div class="card-header">
            <i class="fa fa-user"></i> Edit Users
        </div>
        <div class="card-body">
          <form @submit.prevent="updateUserInfo()">
                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputName">Host Name <span class="reqq">*</span></label>
                    <input v-model="hostname" v-if="!isformshown"  required type="text" class="form-control" id="inputName" placeholder="Enter Hosting Name">
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
                    <button type="submit" class="btn btn-success">Submit <i class="fa fa-check"></i></button>
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
  name: 'admin_edit_user',
  data(){
    return{
     

    }
  },
    mounted(){
       
    },
  methods:{
      updateUserInfo(){

      }
     
  },
  computed:{
     
  },
  components:{
      bread
  }
  
}
</script>

<style scoped>
.container{margin-top: 30px}
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
