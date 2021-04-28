<template>
    <div class=" px-5 mb-5 ">
        <h1 class="subheading grey--text mb-5 "></h1>
        <v-item-group class="mb-5">
            <v-row class="pt-5">
                <v-col v-for="candidate in ActiveCandidates" :key="candidate.id" cols="12" sm="6" md="4" lg="3">
                    <v-item cols="12" sm="12" md="6" lg="3">
                        <v-hover v-slot="{ hover }">
                            <v-card class="mx-auto" max-width="300" :elevation="hover ? 12 : 2"
                                :class="{ 'on-hover': hover }">
                                <v-img :src="candidate.profile_image" lazy-src="/no_image.png" height="200px"
                                    class="d-flex align-end">

                                </v-img>
                                <v-card-subtitle class="">
                                    {{candidate.fullname}}
                                </v-card-subtitle>
                                <div class="d-flex justify-center">

                                </div>
                                <v-card-actions block>
                                    <router-link :to="{name:'CandidatesPost',params:{id: candidate.id}}">
                                        <v-btn color="orange" block text>
                                            See Candidate campaign
                                        </v-btn>
                                    </router-link>
                                    <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-hover>
                    </v-item>
                </v-col>
            </v-row>
        </v-item-group>
    </div>
</template>


<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                name: 'hello'
            }
        },
        computed: {
            ...mapGetters(['ActiveCandidates'])
        },

        methods: {
            ...mapActions(['fetchActiveCandidates'])
        },
        created() {
            this.fetchActiveCandidates();
        },
    }
</script>