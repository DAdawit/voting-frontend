import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import candidates from './modules/candidates';
import admin from './modules/admin';
import election from './modules/election'

import adminAuth from './modules/auth/adminauth'
import candidateAuth from './modules/auth/candidateauth'
import studentAuth from './modules/auth/studentauth'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    auth,candidates,admin,adminAuth,candidateAuth,studentAuth,election
  },
})
