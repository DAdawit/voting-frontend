import axios from 'axios';

export default{
    state:{
        profile:null,
        MyContatc:{},
        Announcements:{},
        myCampaigns:{},
        activeCandidate:{},
        Candidate_Campaign_post:{},
        candidateProfile:{},

    },
    getters:{
        Profile(state){
            return state.profile;
          },
          MyContact(state){
            return state.MyContatc;
          },
          announcements(state){
            return state.Announcements
          },
          MyCampaigns(state){
            return state.myCampaigns
          },
          ActiveCandidates(state){
            return state.activeCandidate;
          },
          CampaignsPosts(state){
            return state.Candidate_Campaign_post;
          },
          CandidateProfile(state){
            return state.candidateProfile;
          },

    },
    actions:{
        async storeContact(_,data){
          return axios.post('candidates/storeContact',data)
        },
        async fetchMyContact({commit},id){
          return await axios.get(`candidates/myProfile/${id}`).then((res)=>{
            commit('SET_MY_CONTACT',res.data[0])
          })
         },
        async checkMyContact(_,id){
          return await axios.get(`candidates/checkProfileExist/${id}`)
        },
        async UpdateProfile({dispatch},data){
          return  axios.post(`candidates/updateProfile/${data.id}`,data).then(()=>{
            dispatch('fetchMyContact',data.user_id);
          })
        },


        // fech election for candidates registration
        async fetchAnnouncements({commit}){
            await axios.get('candidates/election').then((res)=>{
              console.log(res.data)
              let election=res.data.map((item)=>{
                return{
                    id:item.id,
                    title:item.title,
                    reg_due_date:item.reg_due_date,
                    election_due_date:item.election_due_date,
                    description:item.description,
                    reg_date:item.reg_due_date.split(" "),
                    created_at:item.created_at
                }
              })

              let election_registeration=election.map((item)=>{
                return{
                    id:item.id,
                    title:item.title,
                    reg_due_date:item.reg_due_date,
                    election_due_date:item.election_due_date,
                    description:item.description,
                    election_Y_M_D:item.reg_date[0].split("-"),
                    election_h_m:item.reg_date[1].split(":"),
                    created_at:item.created_at
                }
              })

              console.log(election_registeration)
              commit('SET_ANNOUNCEMENTS',election_registeration)

            })
        },
        
        async fetchMyCampaign({commit},id){
          await axios.get(`candidates/myCampaign/${id}`).then((res)=>{
            commit('SET_MY_CAMPAIGN',res.data)
          })
        },

        async postCampaign({dispatch},data){
         return await axios.post('candidates/postCampaign',data).then(()=>{
            dispatch('fetchMyCampaign',data.user_id)
         })
        },

        async Campaign_Edit({dispatch},data){
          await axios.post(`candidates/updateCampaign/${data.id}`,data).then(()=>{
            dispatch('fetchMyCampaign',data.user_id)
          })
        },

        async CampaignDelete({dispatch},data){
            await axios.post(`candidates/deleteCampaign/${data.id}`).then(()=>{
              dispatch('fetchMyCampaign',data.user_id)
            })
        },

        async fetchActiveCandidates({commit}){
          await axios.get('candidates/ActiveCandidates').then((res)=>{
            commit('SET_ACTIVE_CANDIDATES',res.data)
          })
        },

        async fetchCandidateCampaign({commit},id){
          await axios.get(`candidates/campaigns/${id}`).then((res)=>{
              commit('SET_CAMPAIGNS_POSTS',res.data)
          })
        },

        async fetchCandidateProfile({commit},id){
          await axios.get(`candidates/candidateProfile/${id}`).then((res)=>{
            console.log(res.data)
              commit('SET_CANDIDATE_PROFILE',res.data[0])
          })
        },




  },
    mutations:{
          SET_ACTIVE_CANDIDATES(state,data){
            state.activeCandidate=data;
          },
          SET_MY_CAMPAIGN(state,data){
          state.myCampaigns=data;
          },
          SETPROFILE(state,data){
            state.profile=data;
          },
          SET_MY_CONTACT(state,data){
            state.MyContatc=data;
          },
          SET_ANNOUNCEMENTS(state,data){
            state.Announcements=data
          },
          SET_CAMPAIGNS_POSTS(state,data){
            state.Candidate_Campaign_post=data;
          },
          SET_CANDIDATE_PROFILE(state,data){
            state.candidateProfile=data
          },

    }
}