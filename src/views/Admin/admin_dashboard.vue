<template>
    <div class="mt-4">
        <v-container>
            <v-row class="d-flex justify-end">
                <createPost />
            </v-row>
        </v-container>
        <v-container>
        <v-item-group class="mb-5">
            <v-row class="pt-5">
                <v-col v-for="election in Elections" :key="election.product_id" cols="12" sm="6" md="12" lg="12">
                    <v-item cols="12" sm="12" md="12" lg="12">
                            <v-card class="mx-auto">
                                <v-img class="white--text align-end" height="400px" width="700"
                                    src="https://image.freepik.com/free-vector/recruit-agent-analyzing-candidates_74855-4565.jpg">
                                    <v-card-title class="black--text">Election {{election.title}}</v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <router-link :to="{name:'manegecandidates'}">
                                        <v-btn text color="orange">
                                            Candidates
                                        </v-btn>
                                    </router-link>
                                </v-card-actions>
                            </v-card>
                    </v-item>
                </v-col>
            </v-row>
        </v-item-group>
        </v-container>


        <v-row>
            <v-col cols="12">
                <adminPosts />
            </v-col>
        </v-row>
    </div>
</template>
<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import adminPosts from './admin_components/adminPosts';
    import createPost from './admin_components/AdminCreatePost';
    // import activeCandidates from './admin_components/activeCandidates'
    export default {
        components: {
            createPost,
            adminPosts
        },

        computed: {
            ...mapGetters(['Elections'])
        },

        methods: {
            ...mapActions(['fetchElections'])
        },

        created() {
            this.fetchElections();
        },
    }
</script>