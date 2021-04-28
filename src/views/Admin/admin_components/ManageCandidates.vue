<template>
    <div>
        <template>

            <!-- alert for accept request and reject request -->
            <template v-if="show_alert">
                <!-- <v-row> -->
                <v-dialog v-model="alert_dialog" width="500" persistent>
                    <v-alert color="primary" dark icon="priority_high" border="left" prominent>
                        {{message}}
                        <v-btn class="ml-5" @click="submit()">yes</v-btn>
                        <v-btn class="ml-5" @click="close_alert()">no</v-btn>
                    </v-alert>
                </v-dialog>
                <!-- </v-row> -->
            </template>

            <!-- show full image dialog -->
            <template v-if="show_grade_report">
                <v-row>
                    <v-dialog v-model="full_image_dialog">
                        <v-img :src="gradeReportImage" lazy-src="/no_image.png" class="d-flex align-end">
                            <v-row class="d-flex justify-end mr-3 mb-1">
                                <v-btn color="deep-orange lighten-1 white--text" @click="closeImageDialog()">
                                    close
                                </v-btn>
                            </v-row>
                        </v-img>
                    </v-dialog>
                </v-row>
            </template>

            <v-row class="pt-5 mx-5" v-if="Candidates.length > 0">
                <v-col v-for="candidate in Candidates" :key="candidate.id" cols="12" sm="12" md="12" lg="4">
                    <v-item cols="12" sm="12" md="6" lg="6">
                        <v-card class="mx-auto" outlined>
                            <v-list-item three-line>
                                <v-col cols="7">
                                    <v-list-item-content>
                                        <div class="overline mb-4 ">Candidate Information</div>
                                        <v-list-item-title class="headline mb-1 text--secondary text-capitalize">
                                            {{candidate.fullname}}
                                        </v-list-item-title>
                                        <div class="ml-3">
                                            <v-list-item-title>College</v-list-item-title>
                                            <v-list-item-subtitle class="ml-3 mb-1"> {{candidate.college}}
                                            </v-list-item-subtitle>
                                            <v-list-item-title>Departement</v-list-item-title>
                                            <v-list-item-subtitle class="ml-3 mb-1"> {{candidate.department}}
                                            </v-list-item-subtitle>
                                        </div>
                                    </v-list-item-content>
                                </v-col>

                                <v-col class="pr-5">
                                    <v-list-item-avatar tile size="80">
                                       <v-img :src="candidate.profile_image"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-title>SUID: <span
                                            class="text--secondary overline">{{candidate.suid}}</span>
                                    </v-list-item-title>
                                    <v-card-actions>
                                        <div class="mr-5">
                                            <v-btn text @click="showGrade(candidate.image)" rounded color="primary"
                                                class="mr-5">show grade</v-btn>
                                        </div>
                                    </v-card-actions>
                                </v-col>
                            </v-list-item>
                            <v-card-actions>
                                <v-btn text color="primary" @click="acceptAlert(candidate.id)">Approve</v-btn>
                                <v-btn text color="primary" @click="rejetAlert(candidate.id)">Rejecte</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-item>
                </v-col>
            </v-row>
            <v-row v-else>

                <v-container>
                    <v-card width="1300" height="500" class="d-flex justify-center align-center">
                            <v-card-title>NO candidates has been</v-card-title>
                    </v-card>
                </v-container>
            </v-row>
        </template>
    </div>
</template>
<script>
    import {
        Bus
    } from '../../../main';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                dialog: false,
                gradeReportImage: '',
                show_grade_report: false,
                full_image_dialog: false,
                show_alert: false,
                alert_dialog: false,
                message: '',
                candidate:{
                    user_id: null,
                    election_id:this.$route.params.id
                },
                do: null,
                num_candidates: null,
            }
        },
        computed: {
            ...mapGetters(['Candidates'])
        },
        methods: {
            ...mapActions(['fetchCandidates', 'acceptRequest', 'rejectRequest']),
            closeDialog() {
                this.dialog = false;
            },
            showGrade(image) {
                this.gradeReportImage = image;
                this.show_grade_report = true;
                this.full_image_dialog = true;
            },
            closeImageDialog() {
                this.gradeReportImage = '';
                this.show_grade_report = false;
                this.full_image_dialog = false;
            },
            acceptAlert(user_id) {
                this.message = 'Accept Candidate Requeist'
                this.do = 'accept'
                this.candidate.user_id = user_id
                this.show_alert = true;
                this.alert_dialog = true;
            },
            rejetAlert(user_id) {
                this.do = 'reject'
                this.message = 'Reject Candidate Requeist'
                this.candidate.user_id = user_id;
                this.show_alert = true;
                this.alert_dialog = true;
            },
            close_alert() {
                this.message = '';
                this.do = null;
                this.candidate.user_id = null;
                this.show_alert = false;
                this.alert_dialog = false;
            },
            submit() {
                if (this.do == 'accept') {
                    // console.log(this.user_id,this.do)
                    this.acceptRequest(this.candidate).then(() => {
                        this.close_alert();
                        Bus.$emit('alertUser', 'Requested Accepted')
                    })
                } else {
                    // console.log(this.user_id,this.do)
                    this.rejectRequest(this.candidate).then(() => {
                        this.close_alert();
                        Bus.$emit('alertUser', 'Requested Rejected')
                    })
                }
            }
        },
        created() {
            this.fetchCandidates();
        },
    }
</script>