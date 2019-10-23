<template>
      <div class="container">
        <div class="card">
  <div class="card-header">
    <i class="fa fa-server"></i> SMTP Admin 
    <span class=pull-right><a @click="refreshMail()" href="javascript:;"><i class="fa fa-refresh"></i> Refresh</a></span>
  </div>
  <div class="card-body">
    <h5 class="card-title">SMTP List</h5>
    <div class="row">
        <div class='col-sm-3'>
            <div class="form-group">
                <div class='input-group date pull-left'>
                    <input type='date' v-model="searchdate" class="form-control">
                </div>
            </div>
        </div>
        <div class='col-sm-4'>
              <div class="input-group add-on pull-left">
            <input class="form-control" placeholder="Search" v-model="searchbar" name="srch-term" id="srch-term" type="text">
            <div class="input-group-btn btn_search">
                <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
              
            </div>
            </div>
        </div>
        <div class="col-sm-5">
            <!-- <button @click="gotoAdd" class="btn btn-primary pull-right">Add New <i class="fa fa-plus-circle"></i></button> -->
        </div>

    </div>
         
        <table class="table table-bordered  ">
  <thead class="thead-dark">
    <tr>
        <th scope="col">#</th>
        <th scope="col">Account Name</th>
        <th scope="col">SMTP Used</th>
        <th scope="col">Hosting</th>
        <th scope="col">Added By</th>
        <!-- <th scope="col">Action</th> -->
    </tr>
  </thead>
  <tbody>
    <tr  v-for="(key, index) in getSmtps" :key="key.smtp_id">
      <th scope="row">{{index + 1}}</th>
      <td><strong><a :href="key.task_url" target="_blank">{{key.account_name}}</a></strong></td>
      <td>{{key.smtp_used}}</td>
      <td>{{key.hosting}}</td>
      <td>{{key.fname + " "+key.lname }}</td>
      <!-- <td class="td_last">
           <a @click="viewSmpt(key.smpt_id)" href="javascript:;"><i class="fa fa-eye"></i></a>
      
               <a @click="editSmpt(key.smpt_id)" href="javascript:;"><i class="fa fa-edit"></i></a>
             <a @click="deleteSMTP()" class="last" href="javascript:;"><i class="fa fa-trash"></i></a>
           
      </td> -->
    </tr>
    <tr v-if="getSmtpCount == 0">
      <td class="norecords" colspan="6"> <i class="fa fa-database"></i> No records found within that date!</td>
    </tr>
  </tbody>
</table>
  </div>
</div>
        
    


    </div>
</template> 

<script>

console.clear()

export default {
  name: 'admin_home',
  data (){
      return {
          searchbar:"",
          searchdate:"2019-08-16",
          userDatas:{},
          smtpDatas :[]
      }
  },
  methods:{
        getdata(){
          // console.log(this.$store.state.smtp_data)
        },
        // get date
        getcureentdate:function(){
          
            let dt = new Date()
            return  dt.getFullYear() +"-" +((dt.getMonth().toString().length == 1) ? "0"+(dt.getMonth()+1): (dt.getMonth()+1 )) +"-"+((dt.getDate().toString().length == 1) ? "0"+(dt.getDate()): (dt.getDate() ))
        }, 
         convertdate:function(ddate){
            let dt = new Date(ddate)
            return  dt.getFullYear() +"-" +((dt.getMonth().toString().length == 1) ? "0"+(dt.getMonth()+1): (dt.getMonth()+1 )) +"-"+((dt.getDate().toString().length == 1) ? "0"+(dt.getDate()): (dt.getDate() ))
        },
        hasLogin(){
          
        },
        deleteSMTP(){
          let con = confirm("Are you sure to delete this data?")
          if(con){
            
          }
        },
        gotoAdd(){
          this.$router.push({path:'/addsmtp'})
        },
        refreshMail(){

         this.$store.dispatch('smtp/get_all_smtp').then((rsp)=>{
          this.smtpDatas = this.$store.getters['smtp/getSMTP'](this.getcureentdate())
        
          })
          this.userDatas = this.$store.getters['users/getUserInfo']
        },
        viewSmpt(smtpid){
          console.log(smtpid)
          this.$router.push({name: 'viewsmtp', params:{id:smtpid}});
        },
        editSmpt(smtpid){
          console.log(smtpid)
          this.$router.push({name: 'editsmtp', params:{id:smtpid}});
        },
        isAuthorize(id){
          if(this.userDatas.user_id  == id ){
            return true
          }
          else{
            return false
          }
        },
        setSmtps(srcs ,txt, ddate){
          let datas = {
            stext:txt,
            sdate:ddate
          }
          let res = []
          if(srcs =="bar")
          {
             if(txt !="" ){
                res=  this.$store.getters['smtp/getfiltersmtp'](datas)     
               this.smtpDatas = res
            }
            else{
              this.smtpDatas = this.$store.getters['smtp/getSMTP'](ddate)
            }
          }
          else{
            if(txt !="" ){
                res=  this.$store.getters['smtp/getfiltersmtp'](datas)
               this.smtpDatas = res
            }
            else{
               this.smtpDatas = this.$store.getters['smtp/getSMTP'](ddate)
            }
          }
        }
  },
     computed: {
      getSmtps(){
        return this.smtpDatas
      },
      getSmtpCount(){
        return this.smtpDatas.length
      }
  },
      mounted(){
     
      this.refreshMail()
  },
   created(){
       this.searchdate = this.getcureentdate()
   },
   watch :{
     searchbar:function(newVal, old){
         this.setSmtps('bar',newVal, this.searchdate)
     },
     searchdate:function(newVal, old){
        this.setSmtps('date',this.searchbar, this.convertdate(newVal))
    
     }
   }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

 .container{margin-top: 30px}
 .btn_register{margin: 10px 0 0}
 .container{margin-top: 30px}

 .table td, .table th { padding: 6px 5px; }
 .table{font-size: 15px}

.input-group.date{width: 100%;margin: 0 0 10px}
 #srch-term{z-index: 22;box-shadow: none}
 .btn_search{position: relative;left: -2px;}

.td_last .last{color: #eb6161}
 .td_last a{display: inline-block;vertical-align: top;margin: 0 5px}
 .td_last{text-align: right ;}
.btn_search .btn{border: 1px solid #dbcccc;}
 .norecords{text-align: center;color: #eb6161;padding: 10px!important  }
 table tbody{font-size: 13px;}
</style>
