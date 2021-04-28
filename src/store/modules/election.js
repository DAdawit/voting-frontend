import axios from 'axios';

export default{
   state:{
    // elections:{},
    voting:{},
    electionInfo:{}
   },
   getters:{
    // Elections(state){
    //     return state.elections;
    // },
    Votes(state){
        return state.voting
      },
    ElectionInfo(state){
        return state.electionInfo
    }

   },
   actions:{
        // async fetchElections({commit}){
        //     await axios.get('election/elections').then((res)=>{
        //         commit('SET_ELECTIONS',res.data)
        //     })
        // },
        async fetchCandidatesForVoting({commit}){
            await axios.get('election/candidates').then((res)=>{
              commit('SET_VOTING',res.data)
            })
          },
          async vote({dispatch},data){
              await axios.post('election/vote',data).then(()=>{
                  dispatch('fetchCandidatesForVoting')
              })
          },


          // for voting page
          async fetchElectionInfoForVoting({commit}){
              await axios.get('election/electioninfo').then((res)=>{

                let el_info=res.data.map((item)=>{
                    return{
                        id:item.id,
                        title:item.title,
                        Election_start_date:item.election_start_date.split(" "),
                        Election_due_date:item.election_due_date.split(" "),
                    }
                  })

                  let election=el_info.map((item)=>{
                    return{
                        id:item.id,
                        title:item.title,
                        election_start_Y_M_D:item.Election_start_date[0].split("-"),
                        election_start_h_m:item.Election_start_date[1].split(":"),
                        election_due_Y_M_D:item.Election_due_date[0].split("-"),
                        election_due_h_m:item.Election_due_date[1].split(":"),
                    }
                  })
                  commit('SET_ELECTION_INFO',election[0])
              })
          },
          async UpdateElection(_,data){
              await axios.post(`Admin/updateElection/${data.election_id}`,data)
          }
   },
   mutations:{
    // SET_ELECTIONS(state,data){
    //     state.elections=data
    // },
    SET_VOTING(state,data){
        state.voting=data
      },
      SET_ELECTION_INFO(state,data){
          state.electionInfo=data
      },
   }
}