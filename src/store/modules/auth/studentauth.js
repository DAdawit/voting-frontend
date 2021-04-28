import axios from 'axios'
export default{
    state:{
        token: null,
        User: null,
        profile:null,
        su_ids:[]
    },
    getters:{
    student_authenticated(state) {
        return state.token && state.user
      },
      user(state) {
        return state.User;
      },
      Profile(state){
        return state.profile;
      },
    },
    actions:{
      async STUDENT_LOGIN({ dispatch}, credentials) {
        return axios.post('auth/studentLogin', credentials).then((response)=>{
            // console.log(response.data)
          dispatch('voter_data', response.data.token)
          dispatch('set_role',response.data.role)
        })
      },
    async voter_data({commit, state}, token) {
        if (token) {
          commit('SET_TOKEN',token)
        }
        if (!state.token) {
          return
        }
        try {
          let response = await axios.get('auth/student')
          commit('SET_USER', response.data)
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
          SET_USER(state, data){
            state.User = data;
          },
    }
}