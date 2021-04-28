<template>
    <div>

        <template v-if="show_alert">
            <!-- <v-row> -->
            <v-dialog v-model="alert_dialog" width="400" persistent>
                <v-alert color="primary" dark icon="priority_high" border="left" prominent>
                    Delete Memeber
                    <v-btn class="ml-5" @click="submit()">yes</v-btn>
                    <v-btn class="ml-5" @click="close_alert()">no</v-btn>
                </v-alert>
            </v-dialog>
            <!-- </v-row> -->
        </template>


        <v-container>
            <v-simple-table fixed-header height="300">
                <tr class="d-flex justify-content-center">Candidates</tr>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Photo</th>
                            <th class="text-left">Name</th>
                            <th class="text-left">Email</th>
                            <th class="text-left">Phone Number</th>
                            <th class="text-left">Department</th>
                            <th class="text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="candidate in activeCandidates" :key="candidate.id">
                            <td>
                                <v-avatar>
                                    <v-img :src="candidate.profile_image"></v-img>
                                </v-avatar>
                            </td>
                            <td>{{ candidate.fullname }}</td>
                            <td>{{ candidate.email }}</td>
                            <td>{{ candidate.phone_number }}</td>
                            <td>{{ candidate.department }}</td>
                            <td>
                                <v-btn icon color="red" @click="show_delete_box(candidate.id)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>

    </div>
</template>
<script>
import {Bus} from '../../../main';
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    export default {
        data() {
            return {
                alert_dialog: false,
                show_alert: false,
                memeber_id: ''
            }
        },

        computed: {
            ...mapGetters(['activeCandidates'])
        },
        methods: {
            ...mapActions(['fetchActiveCandidates', 'DeleteCandidate']),
            show_delete_box(id) {
                this.memeber_id = id;
                this.show_alert = true,
                    this.alert_dialog = true
            },
            submit() {
                this.DeleteCandidate(this.memeber_id).then(() => {
                    this.show_alert = false
                    this.alert_dialog = false
                    Bus.$emit('candidate_delete','Candidate deleted')
                })
            }
        },
        created() {
            this.fetchActiveCandidates();
        }
    }
</script>