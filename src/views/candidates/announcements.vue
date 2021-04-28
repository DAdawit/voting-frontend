<template>
    <div>
        <template>
            <v-row class="pt-5 mx-5">
                <v-col v-for="announcement in announcements" :key="announcement.id" cols="12" sm="12" md="12" lg="12">
                    <v-item cols="12" sm="12" md="12" lg="12">
                        <v-card class="mx-auto">

                            <v-card-title class="overline ">HUSU</v-card-title>
                            <v-card-title>{{announcement.title}}</v-card-title>
                            <v-row class="d-flex justify-center">
                                <v-col cols="12" class="d-flex justify-center">
                                <Counter :year="announcement.election_Y_M_D[0]"
                                    :month="announcement.election_Y_M_D[1]-1" :date="announcement.election_Y_M_D[2]"
                                    :hour="announcement.election_h_m[0]" :minute="announcement.election_h_m[1]"
                                    :second="10" :millisecond="1" />
                                </v-col>
                                    <br>
                                    <template v-if="registration">
                                            Untile Registration ends 
                                    </template>
                                    <template v-if="registration">
                                            Registration ends 
                                    </template>
                            </v-row>
                            <v-card-subtitle class="pb-0">{{announcement.description}}</v-card-subtitle>
                            <v-card-text class="ml-2">
                                Candidate Registration Due date : {{announcement.reg_due_date}}<br>
                                Election Due date :{{announcement.election_due_date}}
                            </v-card-text>
                            <v-card-text class="ml-2">
                                posted on : {{announcement.created_at}}<br>
                            </v-card-text>

                            <v-card-actions class="d-flex justify-end">
                                <v-btn color="primary" @click="editPost(post)" v-if="role === 'admin'">
                                    Edit
                                    <v-icon right>edit</v-icon>
                                </v-btn>

                                <template v-if="registration">
                                    <v-btn color="primary" text @click="Register(announcement.id)"
                                        class="text-decoration-underline">
                                        Regiser
                                    </v-btn>
                                </template>
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
    } from '../../main'
    import Counter from './Counter_reg'
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        components: {
            Counter
        },
        data() {
            return {
                role: '',
                registration: true,
            }
        },
        computed: {
            ...mapGetters(['announcements'])
        },
        methods: {
            ...mapActions(['fetchAnnouncements']),
            Register(id) {
                Bus.$emit('register', id)
            }
        },
        created() {
            // from candidates.js module
            this.fetchAnnouncements();
            Bus.$on('Registration_over', (() => {
                this.registration = false;
            }))
            this.role=localStorage.getItem('role')
        },
        updated() {
               this.role=localStorage.getItem('role')
        },
    }
</script>