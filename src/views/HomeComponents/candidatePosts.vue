<template>
    <div>
        <v-container>
            <v-row class="d-flex jusify-end">
                <template>
                    <v-card class="mx-auto" max-width="450" tile>
                        <v-img height="100%"
                            src="https://image.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28312.jpg">
                            <v-row align="end" class="fill-height">
                                <v-col align-self="start" class="pa-0" cols="12">
                                    <v-avatar class="profile" color="grey" size="164" tile>
                                        <v-img :src="CandidateProfile.profile_image"></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col class="py-0">
                                    <v-list-item color="rgba(0, 0, 0, .4)" dark>
                                        <v-list-item-content>
                                            <v-list-item-title class="title">{{CandidateProfile.fullname}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>{{CandidateProfile.department}}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>{{CandidateProfile.email}}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>{{CandidateProfile.phone_number}}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-img>
                    </v-card>
                </template>
            </v-row>

            <v-row class="d-flex jusify-end">
                <template>
                    <v-card class="mx-auto mt-5 transparent outlined" width="1200" tile height="200">
                        <!-- <v-img height="100%"
                            src="https://image.freepik.com/free-photo/grey-textured-surface_24837-442.jpg"> -->
                            <v-row class="fill-height">
                                <v-col>
                                    <v-card-title class=" overline text-decoration-underline">My Vision</v-card-title>
                                    <v-card-subtitle class="pb-5 ">{{CandidateProfile.vision}}</v-card-subtitle>
                                </v-col>
                            </v-row>
                        <!-- </v-img> -->
                    </v-card>
                </template>
            </v-row>


            <template>
                <v-row class="pt-5 mx-5">
                    <v-col v-for="campaign in CampaignsPosts" :key="campaign.id" cols="12" sm="12" md="12" lg="12">
                        <v-item cols="12" sm="12" md="12" lg="12">
                            <v-card class="mx-auto">
                                <v-row class="d-flex justify-end mr-5 mt-4">
                                    <v-avatar color="orange" size="62">
                                        <v-img :src="campaign.profile_image"></v-img>
                                    </v-avatar>
                                    <v-card-text class="d-flex justify-end ml-2">
                                        Posted on : {{campaign.created_at}}<br>
                                    </v-card-text>
                                </v-row>
                                <v-card-title>{{campaign.title}}</v-card-title>
                                <v-card-subtitle class="pb-5">{{campaign.body}}</v-card-subtitle>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </template>
        </v-container>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        computed: {
            ...mapGetters(['CampaignsPosts', 'CandidateProfile'])
        },
        methods: {
            ...mapActions(['fetchCandidateCampaign', 'fetchCandidateProfile'])
        },
        created() {
            this.fetchCandidateCampaign(this.$route.params.id);
            this.fetchCandidateProfile(this.$route.params.id);
        },
    }
</script>