<template>
    <div>
        <template>

            <div class="text-center">
                <v-container>
                    <v-dialog v-model="editelectiondialog" width="1300" persistent>
                        <v-card>
                            <v-card-title class="headline grey lighten-2">
                                Edit Election
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                                        <v-row>
                                            <v-col cols="6">
                                                <v-text-field v-model="editdata.title" label="Post Title"
                                                    :rules="[rules.required]"></v-text-field>
                                            </v-col>

                                            <v-col cols="12">
                                                <v-textarea v-model="editdata.description" label="Post Body"
                                                    :rules="[rules.required]"></v-textarea>
                                            </v-col>
                                        </v-row>
                                    </v-form>
                                </v-container>
                            </v-card-text>



                            <v-row class="d-flex justify-space-around ">
                                <!-- set Candidate registration date -->
                                <v-card-actions>
                                    <template>

                                        <div class="text-center">
                                            <v-dialog v-model="reg_due_date_dialog" width="900" persistent>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                                        Edit Candidate Registration due date
                                                    </v-btn>
                                                </template>
                                                <v-card>
                                                    <v-card-title class="headline grey lighten-2">
                                                        Edit Candidate Registration Due Date and time
                                                    </v-card-title>
                                                    <span class="text--secondary">{{current}}</span>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col>
                                                                <v-row justify="center">
                                                                    <v-date-picker
                                                                        v-model="editdata.registration_due_date"
                                                                        :min='new Date().toISOString().substr(0, 10)'
                                                                        year-icon="mdi-calendar-blank"
                                                                        prev-icon="mdi-skip-previous"
                                                                        next-icon="mdi-skip-next">
                                                                    </v-date-picker>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col>
                                                                <v-time-picker v-model="editdata.registration_due_time"
                                                                    format="24hr"></v-time-picker>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                    <span
                                                        class="text--secondary pl-5">{{editdata.registration_due_date}}
                                                        {{editdata.registration_due_time}}</span>
                                                    <v-divider></v-divider>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="primary" text
                                                            @click="setCandidateRegistrationDue()">
                                                            ok
                                                        </v-btn>
                                                        <v-btn color="primary" text
                                                            @click="reg_due_date_dialog = false">
                                                            cancel
                                                        </v-btn>

                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </div>
                                    </template>
                                </v-card-actions>



                                <!-- election due time and date -->

                                <v-card-actions>
                                    <template>
                                        <div class="text-center">
                                            <v-dialog v-model="ele_due_date_dialog" width="900" persistent>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                                        Edit Election start Date and time
                                                    </v-btn>
                                                </template>

                                                <v-card>
                                                    <v-card-title class="headline grey lighten-2">
                                                        Edit Elelction start Date and Time
                                                    </v-card-title>
                                                    <span class="text--secondary">{{current}}</span>

                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col>
                                                                <v-row justify="center">
                                                                    <v-date-picker
                                                                        v-model="editdata.election_start_date"
                                                                        :min='new Date().toISOString().substr(0, 10)'
                                                                        year-icon="mdi-calendar-blank"
                                                                        prev-icon="mdi-skip-previous"
                                                                        next-icon="mdi-skip-next">
                                                                    </v-date-picker>
                                                                </v-row>
                                                            </v-col>
                                                            <v-col>
                                                                <v-time-picker v-model="editdata.election_start_time"
                                                                    format="24hr"></v-time-picker>
                                                            </v-col>
                                                        </v-row>

                                                    </v-card-text>

                                                    <span class="text--secondary pl-5">{{editdata.election_start_date}}
                                                        {{editdata.election_start_time}}</span>
                                                    <v-divider></v-divider>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>
                                                        <v-btn color="primary" text @click="setElectionDue()">
                                                            Ok
                                                        </v-btn>
                                                        <v-btn color="primary" text
                                                            @click="ele_due_date_dialog = false">
                                                            cancel
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>
                                        </div>
                                    </template>
                                </v-card-actions>
                            </v-row>



                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="EditElection()">
                                    update
                                    <v-icon right>edit</v-icon>
                                </v-btn>
                                <v-btn color="primary" text @click="editelectiondialog = false">
                                    cancel
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-container>
            </div>
        </template>

        <template>
            <v-row class="pt-5 mx-5">
                <v-col v-for="election in Elections" :key="election.id" cols="12" sm="12" md="12" lg="12">
                    <v-item cols="12" sm="12" md="12" lg="12">
                        <v-card class="mx-auto">
                            <v-card-title>{{election.title}}</v-card-title>
                            <v-card-subtitle class="pb-0">{{election.description}}</v-card-subtitle>
                            <v-card-text class="ml-2">
                                posted on : {{election.created_at}}<br>
                            </v-card-text>

                            <v-card-actions class="d-flex justify-end">
                                <v-btn color="orange" @click="editPost(election)">
                                    <span class="white--text">Edit</span>
                                    <v-icon right color="white">edit</v-icon>
                                </v-btn>
                                <v-btn color="red" @click="deleteElection(election.id)">
                                    <span class="white--text">delete</span>
                                    <v-icon right color="white" class="white--text">delete</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-item>
                </v-col>
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
    } from 'vuex'
    export default {
        data() {
            return {
                editelectiondialog: false,
                current: new Date(),
                dialog: false,
                valid: true,
                reg_due_date_dialog: false,
                ele_due_date_dialog: false,
                error: '',
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
                editdata: {
                    title: '',
                    description: '',
                    registration_due_date: '',
                    registration_due_time: null,
                    election_start_date: '',
                    election_start_time: null,
                }
            }
        },
        computed: {
            ...mapGetters(['Elections'])
        },

        methods: {
            ...mapActions(['fetchElections', 'UpdateElection', 'DeleteElection']),
            setCandidateRegistrationDue() {
                this.reg_due_date_dialog = false;
            },
            setElectionDue() {
                this.ele_due_date_dialog = false;
            },
            editPost(data) {
                console.log(data)
                this.editelectiondialog = true;
                this.editdata.election_id = data.id;
                this.editdata.title = data.title;
                this.editdata.description = data.description;
                this.editdata.registration_due_date = data.reg_due_date[0]
                this.editdata.registration_due_time = data.reg_due_date[1]
                this.editdata.election_start_date = data.ele_start_date[0]
                this.editdata.election_start_time = data.ele_start_date[1]
            },
            EditElection() {
                this.UpdateElection(this.editdata)
                this.editelectiondialog = false;
                Bus.$emit('UpdatePost', 'Election Updated !');
            },
            deleteElection(id) {
                this.DeleteElection(id).then(() => {
                    this.fetchAdminPosts();
                })
            }
        },

        created() {
            this.fetchElections();
        }

    }
</script>