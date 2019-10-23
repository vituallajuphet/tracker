<template>
    <div class="container">
         <div class="card">
        <div class="card-header">
            <i class="fa fa-tasks"></i> SMTP Records Search
    
        </div>
        <div class="card-body">
              <form action="" @submit.prevent="generaterecord">
                   <div class="row">
                <div class='col-sm-3'>
                    <div class="form-group">
                         <label for="hostingReemarks">From Date</label>
                        <div class='input-group date '>
                            <input v-model="frm.from_date" required type='date' class="form-control">
                        </div>
                    </div>
                </div>
                <div class='col-sm-3'>
                    <div class="form-group">
                         <label for="hostingReemarks">To Date</label>
                        <div class='input-group date'>
                            <input v-model="frm.to_date" required type='date' class="form-control">
                        </div>
                    </div>
                </div>
                 

          </div>
         <div class="row">
             <div class='col-sm-3'>
                         <label for="hostingReemarks">PDQA Option</label>
                     <select required v-model="frm.pdqaOption"  class="form-control hstingsel">
                        <option value="Both">Both</option>
                        <option value="PDQA">PDQA</option>
                        <option value="REPDQA">REPDQA</option>
                     </select>
            </div>
            <div class='col-sm-3'>
                         <label for="hostingReemarks">Mail Method</label>
                     <select required v-model="frm.mail_method" class="form-control hstingsel">
                        <option value="All">All</option>
                        <option value="SMTP">SMTP</option>
                        <option value="PHPMAIL">PHPMAIL</option>
                     </select>
            </div>
            <div class='col-sm-3'>
                         <label for="hostingReemarks">Hosting Name</label>
                     <select required v-model="frm.hostname" class="form-control hstingsel">
                       <option v-for="hosting in hostings" :key="hosting">{{hosting}}</option>
                     </select>
            </div>
         </div>
         <div class="row">      
                <div class="col-sm-3">
                    
                    <button class="btn btn-primary btngenerate" type="submit">Generate</button>
                    <button  @click="clearForm" class="btn btn-danger btncancel" type="button">Cancel</button>
                </div>               
         </div>
              </form>



        </div>
        </div>  

         <div class="card reportscard" v-if="hasResult">
        <div class="card-header">
            <i class="fa fa-table"></i> Report Result
        </div>
        <div class="card-body ">
            <table class="table table-bordered  ">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Account Name</th>
                        <th scope="col">SMTP Used</th>
                        <th scope="col">Hosting</th>
                        <th scope="col">PDQA Option</th>
                        <th scope="col">Added By</th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(key) in reportRecord" :key="key.smtp_id">
                        <td>{{convertDate(key.create_date)}}</td>
                        <td>{{key.account_name}}</td>
                        <td>{{key.smtp_used}}</td>
                        <td>{{key.hosting}}</td>
                        <td>{{key.PDQA}}</td>
                        <td>{{key.fname +"  "+key.lname }} </td>
                    </tr>

                    <tr v-if="reportRecord.length == 0">
                        <td colspan="6">
                            <span class="emtptable">No records found within that data!</span>
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
  name: 'admin_records',
  data(){
      return{
          hasResult:false,
          hostings:["All","GoDaddy.com LLC - 118.139.176.222","GoDaddy.com LLC  - 166.62.16.170","GoDaddy.com LLC  - 166.62.119.28","GoDaddy.com LLC  - 192.169.137.81","GoDaddy.com LLC  - 104.238.100.115", "GoDaddy.com LLC  - 132.148.17.3", "GoDaddy.com LLC  - 166.62.41.108", "InMotion Hosting Inc. - 209.182.192.90", "InMotion Hosting Inc. - 209.182.192.220", "InMotion Hosting Inc. - 66.117.5.39", "InMotion Hosting Inc. - 104.247.73.113", "InMotion Hosting Inc. - 104.152.109.47", "InMotion Hosting Inc. - 132.148.128.189", "GoDaddy.com LLC  - 104.238.102.98", "InMotion Hosting Inc. - 192.145.236.74"],
        frm:{
            from_date:"",
            to_date:"",
            PDQA:"Both",
            mail_method:"All",
            hostname:"All"
        },
        reportRecord :[]
        
      }
  },
mounted(){
  this.refreshsmtp()
},
  methods:{
      generaterecord(){
        this.reportRecord  = []
        let res =  this.$store.getters['smtp/getsmtpreport'](this.frm)
        this.hasResult = true
       if(res.length > 0){
           this.reportRecord  = res
       }
        
      },
      refreshsmtp(){
           this.$store.dispatch('smtp/get_all_smtp').then((rsp)=>{
               console.log(rsp.data)
           })
      },
      clearForm(){
           for (const key in this.frm) {
              if (this.frm.hasOwnProperty(key)) {
                 this.frm[key] ="" 
              }
          }
           this.hasResult = false
      },
      convertDate(dd){
          let dt = new Date(dd)
        return  dt.getFullYear() +"-" +((dt.getMonth().toString().length == 1) ? "0"+(dt.getMonth()+1): (dt.getMonth()+1 )) +"-"+((dt.getDate().toString().length == 1) ? "0"+(dt.getDate()): (dt.getDate() ))
      }
  },
  computed : {
 
      
  }
}
</script>

<style scoped>

 .btngenerate{margin: 15px 0 0}
 .btncancel{margin: 15px 0 0;margin-left: 10px}
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

 .table{font-size: 13px;}
 .emtptable{text-align: center;display: block;text-align: center;color: red}
 .reportscard{margin-bottom: 50px}
</style>
