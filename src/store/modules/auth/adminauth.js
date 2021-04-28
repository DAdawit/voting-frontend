import axios from 'axios'
// import auth from '../auth';
export default{
    state:{
        user_data:null,
        token: null,
        role:null,
        Admin: null,
        profile:null,
        su_ids:[]
    },
    getters:{
    admin_authenticated(state) {
        return state.token && state.user
      },
      admin(state) {
        return state.user;
      },
      Profile(state){
        return state.profile;
      },
    },
    actions:{
        async ADMIN_LOGIN({ dispatch }, credentials) {
            return axios.post('auth/adminLogin', credentials).then((response)=>{
                console.log(response.data)
              dispatch('admin_data', response.data.token)
              dispatch('set_role',response.data.role)
            })
          },
        async admin_data({commit, state}, token) {
            if (token) {
              commit('SET_TOKEN',token)
            }
            if (!state.token) {
              return
            }
            try {
              let response = await axios.get('auth/admin')
              commit('SET_ADMIN', response.data)
            } catch (e) {
              commit('SET_TOKEN', null)
              commit('SET_ADMIN', null)   
            }
          },
          async set_role({commit},role){
              if(role){
                  commit('SET_ROLE',role)
              }
          }
    },
    mutations:{
        SET_TOKEN(state, token){
            state.token = token;
          },
          SET_ADMIN(state, data){
            state.Admin = data;
          },
          SET_ROLE(state ,role){
              state.user=role
          }

    }
}