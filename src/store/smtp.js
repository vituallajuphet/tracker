import axios from 'axios'
import { setTimeout } from 'timers';


const burl  = "http://localhost/smtp_api/";

const smtp = {
    namespaced: true,
    state:{
        smtp_data:[]
    },
    actions:{
        // smtp
    

      get_smtp({ commit }){
        return new Promise((resolve, reject) =>{
         axios.get(burl+'smtp/getall').then((response) =>{
           if(response.data.code == 200){
            commit('GET_SMTP', response.data)
             resolve(response.data)
           }
           else{
             reject({code:200,data:response.data})
           }
         }).catch((err)=>{
           reject({code:500})
         })
        })
       },
      get_all_smtp({ commit }, formdata){
        return new Promise((resolve, reject) =>{
         axios.get(burl+'smtp/getall').then((response) =>{
           if(response.data.code == 200){
            commit('GET_SMTP', response.data)
             resolve(response.data)
           }
           else{
             reject({code:200,data:response.data})
           }
         }).catch((err)=>{
           reject({code:500})
         })
        })
       },
      add_smtp({ commit }, formdata){
        return new Promise((resolve, reject) =>{
         axios.post(burl+'smtp/savesmtp', formdata).then((response) =>{
           if(response.data.code == 200){
             resolve(response.data)
             commit('GET_SMTP', response.data)
           }
           else{
             reject({code:200,data:response.data})
           }
         }).catch((err)=>{
             console.log(err)
           reject({code:500})
         })
        })
       },
       update_smtp({ commit }, formdata){
        return new Promise((resolve, reject) =>{
         axios.post(burl+'smtp/updatesmtp', formdata).then((response) =>{
           if(response.data.code == 200){
             resolve(response.data)
             commit('GET_SMTP', response.data)
           }
           else{
             reject({code:200,data:response.data})
           }
         }).catch((err)=>{
             console.log(err)
           reject({code:500})
         })
        })
       }
    },
    getters:{
        getSMTP :(state) => todayDate => {
         

          let getDates = function(dd){
            let dt = new Date(dd)
            return  dt.getFullYear() +"-" +((dt.getMonth().toString().length == 1) ? "0"+(dt.getMonth()+1): (dt.getMonth()+1 )) +"-"+((dt.getDate().toString().length == 1) ? "0"+(dt.getDate()): (dt.getDate() ))
          }


            return  state.smtp_data.data.filter(smtp => getDates(smtp.create_date) == todayDate) 
        },
        getSpecificSmtp: (state) => id =>{
            return state.smtp_data.data.find(smtp => smtp.smpt_id == id) 
        },
        getfiltersmtp: (state) => (datas) =>{
          
          let getDates = function(dd){
            let dt = new Date(dd)
            return  dt.getFullYear() +"-" +((dt.getMonth().toString().length == 1) ? "0"+(dt.getMonth()+1): (dt.getMonth()+1 )) +"-"+((dt.getDate().toString().length == 1) ? "0"+(dt.getDate()): (dt.getDate() ))
          }
           return state.smtp_data.data.filter(smtp => 
            (smtp.account_name.toLowerCase().indexOf(datas.stext.toLowerCase()) > -1) &&
            (getDates(smtp.create_date) == datas.sdate)
          ) 
      },
      getsmtpreport: (state) => (datas) => {
          
        let conDate = function(dd){
          let dt = new Date(dd)
          return dt
        }

        let comparePdqa = (param1, param2) => {
          if(param1 == "Both"){
            return true
          }
          else if(param1 == param2){
            return true
          }
          return false
        }

        let compareHosting = (par1, par2) =>{
          if(par1 == "All"){
            return true
          }
          else if(par1 == par2){
            return true
          }
          return false
        }
        let compareSMTP = (par1, par2) =>{
          if(par1 == "All"){
            return true
          }
          else if(par1 == "SMTP" && par2.toLowerCase() !="phpmail"){
            return true
          }
          else if(par1.toLowerCase() == "phpmail" && par2.toLowerCase() =="phpmail"){
            return true
          }
          return false
        }

         return state.smtp_data.data.filter(smtp => 
          (
            (conDate(smtp.create_date) >=  conDate(datas.from_date) &&
            conDate(smtp.create_date) <=  conDate(datas.to_date)) &&
            comparePdqa(datas.pdqaOption, smtp.PDQA) &&
            compareHosting(datas.hostname, smtp.hosting) &&
            compareSMTP(datas.mail_method, smtp.smtp_used)

          )
        ) 
    }
      
    },
    mutations:{
        // smtp
        GET_SMTP (state, dd) {
            state.smtp_data = dd 
        },
    }
}

export default smtp

