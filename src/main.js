import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import nav from  './components/Pages/includes/Nav.vue'

// admin sub components
import admin_nav from '@/components/admin/components/Admin_nav.vue'

Vue.component('app-nav', nav)
Vue.component('app-admin-nav', admin_nav)

router.beforeEach((to, from, next) => {
  const tokendata = localStorage.getItem("tokenID")
  if(to.meta.needAuth == true){
    var frData = new FormData();
    let obj = {token:tokendata};
    for (var key in obj ) {
      frData.append(key, obj[key]);
    }
    let formData = frData;

      store.dispatch('users/get_check_auth', formData).then((resp)=>{
        if(resp.code != 200){
          this.$route.push({path:'/login'})
        }
        else{
       
          let userinfos = store.getters["users/getUserInfo"]
      //  check admin or users
   
        if(to.meta.user == 'admin' && userinfos.typ =="developer" ) {
          next({name:'home'})
          console.log("not admin")
        }
        else if(to.meta.user == 'dev' && userinfos.typ =="admin" ){
          console.log("not developer")
          next({name:'adminhome'})    
        }
        else{
        
          next()
        }
                               
      }
    }).catch((err) =>{
      if(err.code == "Error: Network Error"){
        next({name:'noconnection'})
        console.log("no connection")
      }
      else{
        next({name:'login'})
      }
    })
    
  }
  else{
    const isAuth = store.getters['users/get_auth'] ;
    console.log(isAuth)
    if(isAuth && (to.name=='login' || to.name=="register")){
     
     next()
   
    }else{
      next()
    }
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
