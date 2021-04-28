import axios from 'axios';

export default{
    state:{
        candidates:{},
        husuMemebers:{},
        AdminProfile:{},
        ActiveCandidates:{},
        AdminPosts:{},
        election:{}
    },
    getters:{
        Candidates(state){
           return state.candidates;
       },
       HUSUMemebers(state){
           return state.husuMemebers
       },
       adminProfile(state){
           return state.AdminProfile;
       },
       activeCandidates(state){
           return state.ActiveCandidates
       },
       adminPosts(state){
           return state.AdminPosts
       },
       Elections(state){
           return state.election;
       }
    },
    actions:{
        async fetchCandidates({commit}){
            await axios.get('Admin/fetchCandidates').then((res)=>{
                commit('SET_CANDIDATES',res.data)
            })
        },
        async acceptRequest({dispatch},data){
            return await axios.get(`Admin/acceptRequest/${data.user_id}`).then(()=>{
                dispatch('fetchCandidates',data.election_id)
            })
        },
        async rejectRequest({dispatch},data){
            return await axios.get(`Admin/rejectRequest/${data.user_id}`).then(()=>{
                dispatch('fetchCandidates',data.election_id)
            })
        },
        async storeMemeber(_,data){
            return await axios.post('Admin/storeSuMemebers',data)
        },
        async fetchHUSUMemebers({commit}){
            await axios.get('Admin/husuMemebers').then((res)=>{
                commit('SET_HUSU_MEMEBERS',res.data)
            })
        },
        async updateMemeber({dispatch},data){
            return await axios.post(`Admin/updateMemeber/${data.id}`,data).then(()=>{
                dispatch('fetchHUSUMemebers')
            })
        },
        async DeleteMemeber({dispatch},id){
            return await axios.post(`Admin/deleteMemeber/${id}`).then(()=>{
                dispatch('fetchHUSUMemebers')
            })
        },
        async fetchAdminProfile({commit}){
            await axios.get('Admin/adminProfile').then((res)=>{
                // console.log(res.data)
                commit('SET_ADMIN_PROFILE',res.data[0])
            })
        },
        async fetchActiveCandidates({commit}){
            await axios.get('Admin/approvedCandidates').then((res)=>{
                commit('SET_ACTIVE_CANDIDATES',res.data)
            })
        },

        async DeleteCandidate({dispatch},id){
            await axios.post(`Admin/DeleteCandidate/${id}`).then(()=>{
                dispatch('fetchActiveCandidates')
            })
        },

        async CreateElection(_,data){
            return await axios.post('Admin/CreateElection',data)
        },
        async postInfo({dispatch},data){
            return await axios.post('Admin/createPost',data).then(()=>{
                dispatch('fetchAdminPosts')
            })
        },
        async DeletePost(_,id){
            return await axios.post(`Admin/deletePost/${id}`)
        },
        async fetchAdminPosts({commit}){
            return await axios.get('Admin/adminPosts').then((res)=>{
                commit('SET_ADMIN_POSTS',res.data)
            })
        },
        async EditAdminPost({dispatch},data){
            return await axios.post(`Admin/EditPost/${data.post_id}`,data).then(()=>{
                dispatch('fetchAdminPosts')
            })
        },
        async fetchElections({commit}){
             await axios.get('Admin/fetchelections').then((res)=>{
                let el_info=res.data.map((item)=>{
                    return{
                        id:item.id,
                        title:item.title,
                        description : item.description,
                        registration_due_date : item.reg_due_date,
                        election_due_date:item.election_due_date,
                        reg_due_date:item.reg_due_date.split(" "),
                        ele_start_date:item.election_start_date.split(" "),
                        created_at:item.created_at
                    }
                  })
                commit('SET_ELECTION',el_info)
            })
        },

        async UpdateElection({dispatch},data){
           return await axios.post(`Admin/updateElection/${data.election_id}`).then(()=>{
                dispatch('fetchElections')
            })
        },

        async DeleteElection({dispatch},id){
            await axios.post(`Admin/deleteElection/${id}`)
            dispatch('fetchElections')
        }
    },
    mutations:{
        SET_CANDIDATES(state,data){
            state.candidates=data
        },
        SET_HUSU_MEMEBERS(state,data){
            state.husuMemebers=data
        },
        SET_ADMIN_PROFILE(state,data){
            state.AdminProfile=data
        },
        SET_ACTIVE_CANDIDATES(state,data){
            state.ActiveCandidates=data
        },
        SET_ADMIN_POSTS(state,data){
            state.AdminPosts=data;
        },
        SET_ELECTION(state,data){
            state.election=data;
        }
    }
      
}