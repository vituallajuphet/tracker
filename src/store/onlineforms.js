import axios from 'axios'
import { setTimeout } from 'timers';


const burl  = "http://localhost/smtp_api/";

const onlineforms = {
   
    namespaced: true,
    state:{
        forms_data:[],
        loading:false
    },
    actions:{
        get_all_forms({ commit }){
            return new Promise((resolve, reject)=>{
             axios.get(burl+'onlineform/getall').then((response) =>{
               console.log(response)
               if(response.data.code == 200){
                setTimeout(() => {
                  commit('SET_FORMS', response.data)
                  resolve(response.data)
                 console.log(response.data)
                }, 1000);
          
              }   else{
                reject(response.data)
              }
             })
            })
          },
          save_form({ commit }, formData){
            return new Promise((resolve, reject)=>{
             axios.post(burl+'onlineform/admin/savesmtp', formData).then((response) =>{
               console.log(response)
               if(response.data.code == 200){
                resolve(response.data)
              } else{
                reject(response.data)
              }
             })
            })
         },
         update_form({ commit }, formData){
          return new Promise((resolve, reject)=>{
           axios.post(burl+'onlineform/admin/updatesmtp', formData).then((response) =>{
             console.log(response)
             if(response.data.code == 200){
              resolve(response.data)
            } else{
              reject(response.data)
            }
           })
          })
       },
         delete_forms({ commit }, formData){
          return new Promise((resolve, reject)=>{
           axios.post(burl+'onlineform/admin/deletesmtp', formData).then((response) =>{
             console.log(response)
             if(response.data.code == 200){
              resolve(response.data)
            } else{
              reject(response.data)
            }
           })
          })
       }
    },
    getters:{
        getforms :(state) =>{
            return  state.forms_data
        },
        getIsExist: (state) => (frmdata) =>{
          console.log(frmdata)
          return state.forms_data.data.filter((frm) => (frm.smtp_user == frmdata.smtp_user && frm.smtp_server == frmdata.smtp_server))
       },
       getspecificSmtp :(state) => id=>{
        return state.forms_data.data.find((frm) => (frm.id == id))
      },
    },
    mutations:{
        SET_FORMS (state, dd) {
            state.forms_data = dd
          }
    }
}

export default onlineforms

