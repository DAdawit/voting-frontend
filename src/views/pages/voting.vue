<template>
    <div>
        <div v-if="Votes.length > 0">
            <div class="text-center">
                <v-dialog v-model="dialog" width="600" persistent>
                    <v-card>
                        <v-container>
                            <v-row>
                                <v-col cols="12" class="d-flex justify-center">
                                    <v-avatar size="100">
                                        <img :src="electiondata.profile_image" alt="John">
                                    </v-avatar>
                                </v-col>
                                <v-col cols="12">

                                    <v-card-title class="d-flex justify-center text-uppercase mb-3">
                                        Candidate Name : {{electiondata.fullname}}
                                    </v-card-title>
                                    <v-card-subtitle class="d-flex justify-center text-uppercase">Departement :
                                        {{electiondata.department}}</v-card-subtitle>

                                    <v-card-text class="d-flex justify-center display-1">
                                        lock vote ?
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-container>





                        <p class="text-danger overline d-flex justify-center">{{error}}</p>
                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="VotePerson()">
                                yes
                            </v-btn>
                            <v-btn color="primary" text @click="cancelVote()">
                                No
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>





            <v-container>
                <v-card class="mx-auto " max-width="320">
                    <v-img :src="Votes[0].profile_image" lazy-src="/no_image.png" height="200px"
                        class="d-flex align-end">
                    </v-img>

                    <v-card-title class="text-uppercase d-flex justify-center">{{Votes[0].fullname}}</v-card-title>
                    <v-card-subtitle class="text-uppercase d-flex justify-center">{{Votes[0].department}}
                    </v-card-subtitle>
                    <span class="display-2  d-flex justify-center text--secondary mb-5">
                        <v-avatar color="amber accent-4" class="black--text mb-3">
                            {{Votes[0].num_vots}}
                        </v-avatar>
                    </span>
                </v-card>
            </v-container>


            <v-row class="d-flex justify-center">
                <v-col cols="12" class="d-flex justify-center">
                    <counter :year="ElectionInfo.election_due_Y_M_D[0]" :month="ElectionInfo.election_due_Y_M_D[1]-1"
                        :date="ElectionInfo.election_due_Y_M_D[2]" :hour="ElectionInfo.election_due_h_m[0]"
                        :minute="ElectionInfo.election_due_h_m[1]" :second="10" :millisecond="1" />
                </v-col>
                <v-row class="d-flex justify-center">
                    <v-col cols="12" class="d-flex justify-center text-uppercase">
                        <template>
                            {{message}}
                        </template>
                    </v-col>
                    <v-cols cols="12" class="text-uppercase" v-if="voting_end">
                        <template>
                            <span class="display-1 text--secondary">{{Votes[0].fullname}} Wins the Election</span>
                        </template>
                    </v-cols>
                </v-row>

            </v-row>

            <div class=" px-5 mb-5 ">
                <v-item-group class="mb-5">
                    <v-row class="pt-5 d-flex justify-space-around">
                        <v-col v-for="vote in Votes" :key="vote.id" cols="12" sm="6" md="4" lg="2">
                            <v-divider></v-divider>
                            <v-item cols="12" sm="12" md="6" lg="4">
                                <v-hover v-slot="{ hover }">
                                    <v-card class="mx-auto" max-width="300" :elevation="hover ? 12 : 2"
                                        :class="{ 'on-hover': hover }">
                                        <v-img :src="vote.profile_image" lazy-src="/no_image.png" height="200px"
                                            class="d-flex align-end">
                                        </v-img>
                                        <v-card-title class="d-flex justfy-center text-uppercase">{{vote.fullname}}
                                        </v-card-title>
                                        <v-card-subtitle class="d-flex justfy-center text-uppercase">
                                            {{vote.department}}
                                        </v-card-subtitle>
                                        <div class="d-flex justify-center  display-1">
                                            <v-avatar color="grey" class="white--text">
                                                {{vote.num_vots}}
                                            </v-avatar>
                                        </div>
                                        <v-card-actions block>
                                            <v-btn color="orange" block text @click="voteCandidate(vote)"
                                                :disabled="voting_end">
                                                Vote
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-hover>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-item-group>
            </div>
        </div>

    </div>
</template>


<script>
    import counter from '../../components/Counter'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import {
        Bus
    } from '../../main';
    export default {
        components: {
            counter
        },
        data() {
            return {
                dialog: false,
                electiondata: {},
                votedata: {},
                error: '',
                voting_end: false,
                message: 'Voting ends in'
            }
        },

        computed: {
            ...mapGetters(['Votes', 'user', 'ElectionInfo'])
        },
        methods: {
            ...mapActions(['fetchCandidatesForVoting', 'vote', 'fetchElectionInfoForVoting']),
            listen() {
                window.Echo.channel('voting')
                    .listen('vote', () => {
                        this.fetchCandidatesForVoting();
                    })
            },
            voteCandidate(candidate) {
                this.electiondata.user_id = candidate.id;
                this.electiondata.fullname = candidate.fullname;
                this.electiondata.department = candidate.department;
                this.electiondata.profile_image = candidate.profile_image
                this.electiondata.uid = this.user.uid;
                this.dialog = true;
            },
            cancelVote() {
                this.dialog = false;
                this.electiondata.user_id = '';
                this.electiondata.fullname = '';
                this.electiondata.department = '';
                this.electiondata.profile_image = '';
                this.electiondata.uid = '';
            },
            VotePerson() {
                this.error = '';
                this.votedata.user_id = this.electiondata.user_id;
                this.votedata.uid = this.electiondata.uid;
                this.vote(this.votedata).then(() => {
                    this.dialog = false;
                    Bus.$emit('vote_success', 'success !')
                }).catch((err) => {
                    this.error = err.response.data
                })
                console.log(this.votedata);

            }
        },
        created() {
            this.fetchElectionInfoForVoting();
            this.fetchCandidatesForVoting();

            Bus.$on('voting_ends', () => {
                this.voting_end = true;
                this.message = 'Voting is over'
            })
        },
        mounted() {
            this.listen();
        },
    }
</script>