import axios from 'axios'
import { setTimeout } from 'timers';

const burl  = "http://localhost/smtp_api/";


axios.interceptors.response.use((response) => {
  return response;
  },
  (error) => {
 
      return Promise.reject(error);
  }
);

const users = {
    namespaced: true,
    state:{
        users:{
            fname:"",
            lname:"",
            token:"",
            user_id:"",
            email:"",
            typ:""
          },
          hasConnection: false,
          isAuth:false,
          allusers:[]
    },
    actions:{
  
  login_accnt({ commit }, formdata){
    return new Promise((resolve, reject) =>{
     axios.post(burl+'user/login', formdata).then((response) =>{
       if(response.data.code == 200){
         resolve(response.data)
          commit('SET_USER', response.data)
       }
       else{
         reject(response.data)
       }
     }).catch((err)=>{
       reject({code:500})
     })
    })
   },
   update_account({ commit }, formdata){
     return new Promise((resolve, reject) =>{
      axios.post(burl+'user/updatepassword', formdata).then((response) =>{
        if(response.data.code == 200){
          resolve(response.data) 
        }
        else{
          reject(response.data)
        }
      })
     })
    },
   createuser_accnt({ commit }, formdata){
     return new Promise((resolve, reject) =>{
      axios.post(burl+'user/create', formdata).then((response) =>{
        setTimeout(() => {
         if(response.data.code == 200){
           resolve(response.data)
         }
         else{
           reject(response.data)
         }
        }, 1000);
      })
     })
    },
    get_check_auth({ commit }, formdata){
      return new Promise((resolve, reject)=>{
       axios.post(burl+'user/check_auth', formdata).then((response) =>{
          
         if(response.data.code == 200){
           commit('AUTH_USER', response.data)
           resolve(response.data)
         }
         else{
           localStorage.removeItem("tokenID") 
           commit('UNAUTH_USER')
           reject({code:200})        
         }        
       }).catch((err)=>{
   
        //  commit('UNAUTH_USER')
         reject({code:err})  
       })
      })
   },
   logout_user({ commit, state }){
     var formData = new FormData();
     formData.append('token', state.users.token);
     formData.append('user_id', state.users.user_id);
     return new Promise((resolve, reject)=>{
      axios.post(burl+'user/logout', formData).then((response) =>{

        if(response.data.code == 200){
         setTimeout(() => {
           commit('LOGOUT_USER')
           resolve(response.data)
         }, 1000);

       }   else{
         reject(response.data)
       }
      })
     })
    },
      checkConnection({commit}){
      return new Promise((resolve, reject)=>{
        axios.get(burl+'user/checkconnection').then((response) =>{
 
          if(response.data.code == 200){
              resolve(200)
            commit('SET_CONNECTION', true);
          }
        
        }).catch((err) =>{
          commit('SET_CONNECTION', false);
          con
            reject(400)
        })
        }) 
      },
      getAllUsers({commit}, formdata){
        return new Promise((resolve, reject)=>{
          axios.post(burl+'user/getallusers', formdata).then((response) =>{
            if(response.data.code == 200){
              commit('SET_ALL_USERS', response.data.data);
              resolve(200)
            }
          }).catch((err) =>{
    
            reject(response.data)
          })
        }) 
      },
      approveUser({commit}, formdata){
        return new Promise((resolve, reject)=>{
          axios.post(burl+'user/admin/approve', formdata).then((response) =>{
            if(response.data.code == 200){
              resolve(200)
            }
          }).catch((err) =>{
     
            reject(response.data)
          })
        }) 
      },
      deleteUser({commit}, formdata){
        return new Promise((resolve, reject)=>{
          axios.post(burl+'user/admin/delete-user', formdata).then((response) =>{
            if(response.data.code == 200){
              resolve(200)
            }
          }).catch((err) =>{
    
            reject(response.data)
          })
        }) 
      }
    },
    getters:{
        get_auth: (state) =>{
          return  state.isAuth
        },
        getUserInfo : (state) =>{
            return state.users;
         },
         getConnection :(state) =>{
            return  state.hasConnection
          },
         getUserid:(state) =>{
            return  state.users.user_id
         },
         getusers:(state) =>{
          return  state.allusers
       },
         getApprovedusers:(state) =>{
          return  state.allusers.filter(usrs => usrs.approved == 1).length
       },
        getPendingusers:(state) =>{
        return  state.allusers.filter(usrs => usrs.approved == 0).length
       },
       getAllApproved:(state) =>{
        return  state.allusers.filter(usrs => usrs.approved == 1)
       },
       getAllPending:(state) =>{
        return  state.allusers.filter(usrs => usrs.approved == 0)
       }
     
    },
    mutations:{
           // user here
    SET_USER (state, dd) {
        state.users.fname = dd.fname
        state.users.lname = dd.lname
        state.users.user_id = dd.user_id
        state.users.token = dd.token
        state.users.email = dd.email
        state.users.typ = dd.user_type
       localStorage.setItem("tokenID", dd.token) 
       state.hasConnection = true
       state.isAuth = true
     },
     UNAUTH_USER (state){
      state.users.user_id =""
      state.users.token = ""
      state.users.fname = ""
      state.users.lname = ""
      state.users.email = ""
      state.users.typ = ""
      state.hasConnection = false
      state.isAuth = false
   },
     AUTH_USER (state, dd){
        state.users.user_id = dd.data[0].user_id
        state.users.token = dd.data[0].token_value
        state.users.fname = dd.data[0].fname
        state.users.lname = dd.data[0].lname
        state.users.email = dd.data[0].email
        state.users.typ = dd.data[0].user_type
        state.hasConnection = true
        state.isAuth = true
     },
     LOGOUT_USER (state){
      state.users.fname = ""
        state.users.lname = ""
        state.users.user_id = ""
        state.users.token = ""
        state.users.email = ""
        state.users.typ = ""
       localStorage.removeItem("tokenID") 
       state.hasConnection = false
       state.isAuth = false
     },
     SET_CONNECTION (state, con) {
        state.hasConnection = con
     },
     UNSET_CONNECTION (state, con) {
      state.hasConnection = false
   },
      SET_ALL_USERS (state, users) {
        state.allusers = users
      }
    }
}

export default users

