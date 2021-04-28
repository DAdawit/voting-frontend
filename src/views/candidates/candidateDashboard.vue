<template>
    <div>


        <!-- edit dialog -->
        <template>
            <div class="text-center">
                <v-dialog v-model="dialog" width="800" persistent>
                    <v-card>
                        <v-card-title class="headline grey lighten-2">
                            Edit Campaign
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field v-model="editdata.title" label="Campaign Title"
                                                :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="editdata.body" label="Campaign Body"
                                                :rules="[rules.required]"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="Edit_data()">
                                update
                                <v-icon right>edit</v-icon>
                            </v-btn>
                            <v-btn color="primary" text @click="dialog = false">
                                cancel
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>






        <v-container>
            <v-row class="d-flex justify-content-center" v-if="user.account_status=='pending'">
                <div class="d-flex overline justify-content-center mt-5 pl-5 align-center">
                    <v-alert color="#C51162" dark icon="pending" border="right" height="80">
                        your account is not approved yet !
                    </v-alert>
                </div>
            </v-row>
            <div v-else>
                <v-row class="d-flex justify-end">
                    <create_campain />
                </v-row>
            </div>


            <template>
                <v-row class="pt-5 mx-5">
                    <v-col v-for="campaign in MyCampaigns" :key="campaign.id" cols="12" sm="12" md="12" lg="12">
                        <v-item cols="12" sm="12" md="12" lg="12">
                            <v-card class="mx-auto">
                                <v-card-title class="overline ">HUSU</v-card-title>
                                <v-card-title>{{campaign.title}}</v-card-title>
                                <v-row class="d-flex justify-center">
                                </v-row>
                                <v-card-subtitle class="pb-0">{{campaign.body}}</v-card-subtitle>
                                <v-card-text class="ml-2">
                                </v-card-text>
                                <v-card-text class="ml-2">
                                    posted on : {{campaign.created_at}}<br>
                                </v-card-text>
                                <v-card-actions class="d-flex justify-end">
                                    <v-btn color="orange" @click="editCampaign(campaign)" class="white--text">
                                        Edit
                                        <v-icon right color="white">edit</v-icon>
                                    </v-btn>

                                    <v-btn color="red" @click="DeleteCampaign(campaign.id)" class="white--text">
                                        delete
                                        <v-icon right color="white">delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </template>


        </v-container>
    </div>
</template>
<script>
    import create_campain from './create_campaign';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
import { Bus } from '../../main';

    export default {
        data() {
            return {
                valid: true,
                editdata: {},
                deletedata:{},
                dialog: false,
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
            }
        },
        components: {
            create_campain
        },
        computed: {
            ...mapGetters(['user', 'MyCampaigns'])
        },
        methods: {
            ...mapActions(['fetchMyCampaign','Campaign_Edit','CampaignDelete']),
            editCampaign(data) {
                this.editdata.id = data.id;
                this.editdata.title = data.title;
                this.editdata.body = data.body;
                this.editdata.user_id=this.user.id;
                this.dialog = true;
            },
            Edit_data(){
                this.Campaign_Edit(this.editdata).then(()=>{
                    this.dialog=false;
                    Bus.$emit("campaign_updated",'Campaign Updated')
                })
            },
            DeleteCampaign(id){
                this.deletedata.id=id;
                this.deletedata.user_id=this.user.id;
                this.CampaignDelete(this.deletedata)

            }
        },
        created() {
            this.fetchMyCampaign(this.user.id);
        },

    }
</script>