<template>
    <div>
        <v-container>
            <v-card>
                <v-img height="500" max-height="500" src="/election2.jpg" class="my-3 d-flex justify-center align-end">

                    <v-row v-if="!voting_start" class="d-flex justify-center">
                        <v-col cols="12" class="d-flex justify-center">
                            <counter :year="ElectionInfo.election_start_Y_M_D[0]"
                                :month="ElectionInfo.election_start_Y_M_D[1]-1"
                                :date="ElectionInfo.election_start_Y_M_D[2]" :hour="ElectionInfo.election_start_h_m[0]"
                                :minute="ElectionInfo.election_start_h_m[1]" :second="10" :millisecond="1" />
                        </v-col>
                        <template>
                            <span class="display-1  white--text">VOTING STARTS IN</span>
                        </template>

                    </v-row>
                    <v-row class="d-flex align-end">
                        <v-col class="d-flex justify-center  pt-5">

                            <v-col cols="12" 
                                class="d-flex justify-center align-end amber--text overline pt-5 text-decoration-underline">
                                You will be redirected when voting starts
                            </v-col>
                        </v-col>
                    </v-row>

                </v-img>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import {
        Bus
    } from '../../main';
    import counter from '../../components/Counter';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        components: {
            counter
        },
        data() {
            return {

            }
        },

        computed: {
            ...mapGetters(['ElectionInfo'])
        },

        methods: {
            ...mapActions(['fetchElectionInfoForVoting'])
        },
        created() {
            this.fetchElectionInfoForVoting();
            Bus.$on('voting_start', () => {
                this.$router.push({ name: 'voting' }).catch(() => {});
                // this.$router.replace({
                //     name:'voting'
                // })
            })
        },
    }
</script>