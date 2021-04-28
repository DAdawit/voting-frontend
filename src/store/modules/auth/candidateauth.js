import axios from 'axios'
export default{
    state:{
        token: null,
        user: null,
        profile:null,
        su_ids:[]
    },
    getters:{
    authenticated(state) {
        return state.token && state.user
      },
      user(state) {
        return state.user;
      },
      Profile(state){
        return state.profile;
      },
    },
    actions:{
      async REGISTER_CANDIDATE(_,credentials){
        return axios.post('auth/register', credentials)
      },
  
        async signIn({ dispatch }, credentials) {
            return axios.post('auth/signin', credentials).then((response)=>{
                console.log(response.data)
              return [dispatch('candidate_data', response.data.token),dispatch('set_role',response.data.role)];
            })
          },
      
          async candidate_data({commit, state }, token) {
            if (token) {
              commit('SET_TOKEN', token)
            }
            if (!state.token) {
              return
            }
            try {
              let response = await axios.get('auth/me')
              commit('SET_USER', response.data)
            } catch (e) {
              commit('SET_TOKEN', null)
              commit('SET_USER', null)   
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
          SET_USER(state, data){
            state.user = data;
          },
    }
}