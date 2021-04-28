import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import admin_dashboard from '../views/Admin/admin_dashboard.vue'


import complete_profile from '../views/pages/complete_profile.vue'

import profile from '../views/pages/profile.vue'
import loginf from '../components/auth/login.vue'

// import counter from '../components/Counter.vue'

// import store from '@/store'


import candidate_registration from '../views/candidates/candidate_reg.vue'
import candidate_app_form from '../views/candidates/canddidateApplicationForm.vue';
import candidateDashboard from '../views/candidates/candidateDashboard.vue'

import adminLogin from '../views/Admin/adminLogin.vue';
import manegecandidates from '../views/Admin/admin_components/ManageCandidates.vue';
import HUSUmemebers from '../views/Admin/admin_components/HUSUmemebers.vue'
import createElection from '../views/Admin/admin_components/createElection.vue';
import ManageElection from '../views/Admin/admin_components/ManageElection.vue'

import voting from '../views/pages/voting.vue'
import news from '../views/pages/news.vue'
import page404 from '../views/pages/page404.vue'
import CandidatesPost from '../views/HomeComponents/candidatePosts.vue'
// import createAnnouncement from '../views/Admin/admin_components/Createannouncement..vue'
import candidates from '../views/Admin/admin_components/activeCandidates.vue';
import voteWaiting from '../views/pages/beforeStartVoting.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/candidate_registration',
    name:'candidate_registration',
    component:candidate_registration
  },
  {
    path:'/candidate_app_form',
    name:'candidate_app_form',
    component:candidate_app_form,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path:'/candidateDashboard',
    name:'candidateDashboard',
    component:candidateDashboard,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path:'/manegecandidates',
    name:'manegecandidates',
    component:manegecandidates,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
    
  },
  {
    path:'/adminLogin',
    name:'adminLogin',
    component:adminLogin
  },

  {
    path:'/husuMemebers',
    name:'husuMemebers',
    component:HUSUmemebers,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path:'/voteWaiting',
    name:'voteWaiting',
    component:voteWaiting
  },
  {
    path:'/CandidatesPost/:id/campaign',
    name:'CandidatesPost',
    component:CandidatesPost
  },
  {
    path:'/ManageElection',
    name:'ManageElection',
    component:ManageElection,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path:'/voting',
    name:'voting',
    component:voting,
  },

  {
    path:'/candidates',
    name:'candidates',
    component:candidates
    
  },
  {
    path:'/news',
    name:'news',
    component:news
  },
  {
    path: '/admin_dashboard',
    name: 'admin_dashboard',
    component: admin_dashboard,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   } 
  },
  {
    path: '/createElection',
    name: 'createElection',
    component: createElection,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },
  {
    path: '/complete_profile',
    name: 'complete_profile',
    component: complete_profile,
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('role')){
        return next({
          name:'Home'
        })
      }
      next()
   }
  },

  {
    path: '/loginf',
    name: 'loginf',
    component: loginf
  },
  {
    path:'*',
    name:'page404',
    component:page404
  }

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
