<template>
    <div>
        <v-row class="d-flex justify-content-center">
            <v-col cols="5">

                <v-card>
                    <v-card-title class="d-flex justify-content-center mt-5">
                        <v-icon large left>
                            login
                        </v-icon>
                        <span class="text--secondary display-1">LOGIN</span>
                    </v-card-title>
                    <v-card-text>
                        <v-col cols="12">
                            <v-form ref="registerForm" v-model="valid" lazy-validation>
                                <v-container>
                                    <v-container>
                                        <v-container>
                                            <v-row justify="center">
                                                <v-col cols="12">
                                                    <v-text-field  v-model="inp.Username" :rules="UsernameRules"
                                                        class="px-5" label="Username">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="inp.password"
                                                        :append-icon="show1?'eye':'eye-off'"
                                                        :rules="[rules.required, rules.min]"
                                                        :type="show1 ? 'text' : 'password'" name="input-10-1"
                                                        label="Password" hint="At least 2 characters" counter
                                                        @click:append="show1 = !show1" class="px-5">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <p class="text-danger overline">{{error}}</p>
                                        </v-container>
                                    </v-container>
                                </v-container>
                                <v-row>
                                    <v-col class="d-flex justify-center">
                                        <v-btn class="d-flex right primary" @click="login()" :loading="loading"
                                            :disabled="!valid">
                                            <span>Login</span>
                                            <v-icon right>login</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        data() {
            return {
                dialog: false,
                loading: false,
                show1: false,
                error: '',
                valid: true,
                inp: {
                    Username: '',
                    password: ''
                },
                UsernameRules: [
                    v => !!v || 'Username is required',
                    // v => /^a-zA-Z0-9+$/.test(v) || 'Username must with character',
                    v => (v && v.length >= 3) || 'Name must be greater than 3 characters',
                    // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                }
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            ...mapActions(['ADMIN_LOGIN']),
            login() {
                this.error = '';
                if (this.inp.Username == '') {
                    this.error = 'Username is required';
                    return;
                } else if (this.inp.password == '') {
                    this.error = 'password is required';
                    return
                }
                this.ADMIN_LOGIN(this.inp).then(() => {
                        this.loading = false;
                        this.$router.replace({
                            name: 'admin_dashboard'
                        })
                    }).then(() => {
                        location.reload()
                    })


                    .catch(() => {
                        this.error = 'username and password not match !'
                    })
            }
        },
    }
</script>