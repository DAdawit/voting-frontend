import axios from 'axios'

export default {
  // namespaced:true,
  state: {
    token: null,
    user: null,
    profile:null,
    su_ids:[]
  },

  getters: {

    authenticated(state) {
      return state.token && state.user
    },
    user(state) {
      return state.user;
    },
    Profile(state){
      return state.profile;
    },
    Su_union_ids(state){
      return state.su_ids;
    }

  },

  actions: {

    async attempt({commit}) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)   
    },

    async signOut({commit}) {
      return await axios.post('auth/signout').then(() => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
        localStorage.removeItem('role');
      })
    },

    async storeGrade(_,credentials){
      return axios.post('candidates/storeGradeReport',credentials)
    },

    async findMyProfile({commit},id){
        await axios.get(`user/myProfile/${id}`).then((res)=>{
          console.log(res.data[0])
          commit('SETPROFILE',res.data[0]);
          return;
        })
    },
    async UpdateProfile({dispatch},credentials){
      await axios.post(`user/updateProfile/${credentials.id}`,credentials).then(()=>{
        dispatch('findMyProfile',credentials.user_id)
      }).catch((err)=>{
        console.log(err);
      })
    },
    async fetchSu_memeber_ids({commit}){
      await axios.get('st_un/membersId').then((res)=>{
        commit('SET_ST_UNION_IDS',res.data)
      })
    },
    async CangeUserPassword(_,data){
      return await axios.post('auth/changeUserPassword',data);
    }

},
  mutations: {
    SET_ST_UNION_IDS(state, ids){
      state.su_ids=ids;
    },
    SET_TOKEN(state, token){
      state.token = token;
    },
    SET_USER(state, data){
      state.user = data;
    },
    SETPROFILE(state,data){
      state.profile=data;
    }
  }
}