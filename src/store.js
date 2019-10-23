import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { setTimeout } from 'timers';

import smtp from '@/store/smtp.js';
import users from '@/store/users.js';
import hosting from '@/store/hosting.js';
import onlineforms from '@/store/onlineforms.js';

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    smtp,
    users,
    hosting,
    onlineforms
  }
 
})
