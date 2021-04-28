<template>
    <div>
        <v-card class="my-5" outlined>
            <v-card-title class="headline grey lighten-2 d-flex justify-content-center">
                CERATE ELECTION
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="election.title" label="Title" :rules="[rules.required]"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea v-model="election.description" label="Election Description" :rules="[rules.required]"></v-textarea>
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
                                        Set Candidate Registration due date
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="headline grey lighten-2">
                                        Set Candidate Registration Due Date and time
                                    </v-card-title>
                                    <span class="text--secondary">{{current}}</span>
                                    <v-card-text>
                                        <v-row>
                                            <v-col>
                                                <v-row justify="center">
                                                    <v-date-picker v-model="election.registration_due_date" :min='new Date().toISOString().substr(0, 10)' year-icon="mdi-calendar-blank"
                                                        prev-icon="mdi-skip-previous" next-icon="mdi-skip-next">
                                                    </v-date-picker>
                                                </v-row>
                                            </v-col>
                                            <v-col>
                                                <v-time-picker v-model="election.registration_due_time" format="24hr"></v-time-picker>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <span class="text--secondary pl-5">{{election.registration_due_date}} {{election.registration_due_time}}</span>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="setCandidateRegistrationDue()">
                                            ok
                                        </v-btn>
                                         <v-btn color="primary" text @click="reg_due_date_dialog = false">
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
                                        Set Election start Date and time
                                    </v-btn>
                                </template>

                                <v-card>
                                    <v-card-title class="headline grey lighten-2">
                                        Set Elelction start Date and Time
                                    </v-card-title>
<span class="text--secondary">{{current}}</span>
                                    <v-card-text>
                                        <v-row>
                                            <v-col>
                                                <v-row justify="center">
                                                    <v-date-picker v-model="election.election_start_date" :min='new Date().toISOString().substr(0, 10)' year-icon="mdi-calendar-blank"
                                                        prev-icon="mdi-skip-previous" next-icon="mdi-skip-next">
                                                    </v-date-picker>
                                                </v-row>
                                            </v-col>
                                            <v-col>
                                                <v-time-picker v-model="election.election_start_time" format="24hr"></v-time-picker>
                                            </v-col>
                                        </v-row>

                                    </v-card-text>

                                    <span class="text--secondary pl-5">{{election.election_start_date}} {{election.election_start_time}}</span>
                                    <v-divider></v-divider>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="setElectionDue()">
                                           Ok
                                        </v-btn>
                                          <v-btn color="primary" text @click="ele_due_date_dialog = false">
                                            cancel
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </template>
                </v-card-actions>
            </v-row>


         <p class="text-danger overline ml-5">{{error}}</p>


            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="setElection()" :disabled="!valid">
                    create
                    <v-icon right>post_add</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import {Bus} from '../../../main';
import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                current:new Date(),
                dialog: false,
                valid: false,
                reg_due_date_dialog: false,
                ele_due_date_dialog: false,
                error:'',

                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
                    election:{
                        title:'',
                        description:'',
                        registration_due_date:new Date().toISOString().substr(0, 10),
                        election_start_date:new Date().toISOString().substr(0, 10),
                        registration_due_time: null,
                        election_start_time: null,
                    },
            }
        },
        methods:{
                ...mapActions(['CreateElection']),
            setCandidateRegistrationDue(){
                this.reg_due_date_dialog=false;
            },
            setElectionDue(){
                this.ele_due_date_dialog=false;
            },
            setElection(){
                this.error='';
                // console.log(this.election.registration_due_time,this.election.election_due_time);

                if(this.election.title=='' || this.election.description == ''){
                    this.error='all input must be filled';
                    return ;
                }else if(this.election.registration_due_time == null){
                    this.error='please set candidate Registration Date'
                    return ;
                }else if(this.election.election_start_time == null){
                    this.error='please set election due time';
                    return ;
                }
                this.CreateElection(this.election).then(()=>{
                    Bus.$emit('ElectionCreated','Eelection Created Successfully');
                    this.$router.replace({
                        name:'admin_dashboard'
                    })
                })
                

            }

        }
    }
</script>