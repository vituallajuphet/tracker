import Vue from 'vue'
import VueRouter  from 'vue-router'
import login from '@/components/Pages/Login.vue'
import home from '@/components/Pages/Home.vue'
import register from '@/components/Pages/Register.vue'
import notFound from '@/components/Pages/NotFound.vue'
import compose from '@/components/Pages/Create.vue'
import hosting from '@/components/Pages/Hosting.vue'
import onlineform from '@/components/Pages/Onlineform.vue'
import noconnection from '@/components/Pages/Noconnection.vue'
import addsmtp from '@/components/Pages/Addsmtp.vue'
import viewsmtp from '@/components/Pages/Viewsmtp.vue'
import editsmtp from '@/components/Pages/Editsmtp.vue'


// admin components
import adminhome from '@/components/admin/views/Adminhome.vue'
import admin_profile from '@/components/admin/views/Admin_Profile.vue'
import admin_hosting from '@/components/admin/views/Admin_hosting.vue'
import admin_form from '@/components/admin/views/Admin_onlineform.vue'
import admin_records from '@/components/admin/views/Admin_records.vue'
import admin_users from '@/components/admin/views/Admin_users.vue'
import admin_system_log from '@/components/admin/views/Admin_system_log.vue'
import admin_add_hosting from '@/components/admin/views/Admin_add_hosting.vue'
import admin_edit_hosting from '@/components/admin/views/Admin_hosting_edit.vue'
import admin_add_onlineform from '@/components/admin/views/Admin_add_onlineforms.vue'
import admin_edit_onlineform from '@/components/admin/views/Admin_onlineform_edit.vue'
import admin_edit_user from '@/components/admin/views/Admin_edit_user.vue'


import prof from '@/components/Pages/Profile.vue'

Vue.use(VueRouter)

export default new VueRouter ({
    base: __dirname,
    routes: [
        { path: '/404', component: notFound },  
        { path: '*', redirect: '/404' , meta:{user:'dev', needAuth:true} },  
        { path: '/login', name: 'login', component: login },
        { path: '/register', name: 'register', component: register },
        { path: '/home', name: 'home', component: home, meta:{user:'dev', needAuth:true} },
        { path: '/create', name: 'create', component: compose, meta:{user:'dev', needAuth:true} },
        { path: '/hosting', name: 'hosting', component: hosting, meta:{user:'dev', needAuth:true} },
        { path: '/onlineform', name: 'onlineform', component: onlineform, meta:{user:'dev', needAuth:true} },
        { path: '/checkconnection', name: 'noconnection', component: noconnection},
        { path: '/profile', name: 'profile', component: prof, meta:{user:'dev', needAuth:true} },
        { path: '/addsmtp', name: 'addsmtp', component: addsmtp, meta:{user:'dev', needAuth:true} },
        { path: '/viewsmtp/:id', name: 'viewsmtp', component: viewsmtp,  props: true , meta:{user:'dev', needAuth:true} },
        { path: '/editsmtp/:id', name: 'editsmtp', component: editsmtp,  props: true , meta:{user:'dev', needAuth:true} },
        { path: '/', redirect: '/home' },


        // admin
        { path: '/admin/', name: 'adminhome', component: adminhome,  meta:{user:'admin', needAuth:true} },
        { path: '/admin/profile', name: 'admin_profile', component: admin_profile,  meta:{user:'admin', needAuth:true} },
        { path: '/admin/hosting', name: 'admin_hosting', component: admin_hosting,  meta:{user:'admin', needAuth:true} },
        { path: '/admin/onlineforms', name: 'admin_form', component: admin_form ,  meta:{user:'admin', needAuth:true}},
        { path: '/admin/users', name: 'admin_users', component: admin_users,  meta:{user:'admin', needAuth:true} },
        { path: '/admin/records', name: 'admin_records', component: admin_records ,  meta:{user:'admin', needAuth:true}},
        { path: '/admin/system-logs', name: 'admin_system_log', component: admin_system_log ,  meta:{user:'admin', needAuth:true} },
        { path: '/admin/edit-user/:id', name: 'admin_edit_user', component: admin_edit_user, props: true ,  meta:{user:'admin', needAuth:true} },
        { path: '/admin/home', redirect: '/admin/'  },

        // sub
        { path: '/admin/hosting/addnew', name: 'admin_hosting_add', component: admin_add_hosting },
        { path: '/admin/hosting/edit', name: 'admin_edit_hosting', component: admin_edit_hosting,  props: true },

        // forms
        { path: '/admin/onlineform/addnew', name: 'admin_add_onlineform', component: admin_add_onlineform ,  meta:{user:'admin', needAuth:true}},
        { path: '/admin/onlineform/edit', name: 'admin_edit_onlineform', component: admin_edit_onlineform, props: true ,  meta:{user:'admin', needAuth:true} },





    ]
})
