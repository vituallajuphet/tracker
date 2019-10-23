import axios from 'axios'
import { setTimeout } from 'timers';


const burl  = "http://localhost/smtp_api/";

const hosting = {
    namespaced: true,
    state:{
        hosting_data:[],
    },
    actions:{
        get_all_host({ commit }){
            return new Promise((resolve, reject)=>{
             axios.get(burl+'hosting/getall').then((response) =>{
               console.log(response)
               if(response.data.code == 200){
                setTimeout(() => {
                  commit('SET_HOSTING', response.data)
                  resolve(response.data)
 
                }, 1000);
        
              }   else{
                reject(response.data)
              }
             })
            })
         },
         save_hosting({ commit }, formData){
          return new Promise((resolve, reject)=>{
           axios.post(burl+'hosting/admin/savehosting', formData).then((response) =>{

             if(response.data.code == 200){
              resolve(response.data)
            } else{
              reject(response.data)
            }
           })
          })
       },
       update_hosting({ commit }, formData){
        return new Promise((resolve, reject)=>{
         axios.post(burl+'hosting/admin/updatehosting', formData).then((response) =>{

           if(response.data.code == 200){
            resolve(response.data)
          } else{
            reject(response.data)
          }
         })
        })
     },
     delete_hosting({ commit }, formData){
      return new Promise((resolve, reject)=>{
       axios.post(burl+'hosting/admin/deletehosting', formData).then((response) =>{

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
        getHostings :(state) =>{
            return  state.hosting_data
        },
        getspecificHostings :(state) => id=>{
          return state.hosting_data.data.find((hostt) => (hostt.id == id))
        },
        getIsExist: (state) => (hostData) =>{

          // return state.hosting_data.data.filter((hostt) => (hostt.hosting_ip == hostData.ip && hostt.hosting_name == hostData.hname)) 
          return state.hosting_data.data.filter((hostt) => (hostt.hosting_ip == hostData.hosting_ip && hostt.hosting_name == hostData.hname))
      },
    },
    mutations:{
        SET_HOSTING (state, dd) {
            state.hosting_data = dd
        }
    }
}

export default hosting

