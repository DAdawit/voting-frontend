<template>
    <div>
        <v-container>
            <!-- <v-row class="d-flex justify-end"> -->
                <!-- <v-col cols="12" md="12" lg="12" >  -->
                    <!-- <ca_register /> -->
                <!-- </v-col> -->
            <!-- </v-row> -->

            <v-row class="d-flex" v-if="role === '' || role === null">
                <v-col cols="8">
                    <v-card>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="text--secondary display-1 mb-5">To Be Candidate</v-list-item-title>
                                <v-list-item-subtitle class="ml-5 mb-4">
                                    1, You must be a member of HUSU.
                                </v-list-item-subtitle>
                                <v-list-item-subtitle class="ml-5 mb-4">
                                    2, First and GC students are not allwoed to be candidate.
                                </v-list-item-subtitle>
                                <v-list-item-subtitle class="ml-5 mb-4">
                                    3, Your last commulative grade must be greater than 3.0
                                </v-list-item-subtitle>
                                <v-list-item-subtitle class="ml-5 mb-4">
                                    4, You should have good decipline and be active
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col>
                <v-col cols="4 d-flex justify-end" v-if="role === '' || role === null">
                      <ca_login />
                </v-col>
            </v-row>
            <v-row>
                <announcements />
            </v-row>
                <ca_register />
        </v-container>
    </div>
</template>
<script>
import announcements from '../candidates/announcements'
    import ca_register from './register';
    import ca_login from './candidate_login'
    export default {
        data() {
            return {
                role:''
            }
        },
        components: {
            ca_register,
            ca_login,
            announcements
        },
        mounted() {
         this.role=localStorage.getItem('role')
        },
        updated() {
            this.role=localStorage.getItem('role')
            console.log(this.role)
        },
    }
</script>