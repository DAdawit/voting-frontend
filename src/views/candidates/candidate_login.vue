<template>
    <div>
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    login
                    <v-icon right>login</v-icon>
                </v-btn>
            </template>
            <v-card max-width="500">
                <v-card-title class="d-flex justify-content-center">
                    <v-icon large left>
                        login
                    </v-icon>
                    <span class="text--secondary display-1">LOGIN</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                        <v-container>
                            <v-container>
                                <v-container>
                                    <v-row justify="center">
                                        <v-col cols="12">
                                            <v-text-field v-model="inp.Username" :rules="userNameRules" class="px-5"
                                                label="Username">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field v-model="inp.password" :append-icon="show1?'eye':'eye-off'"
                                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                                name="input-10-1" label="Password" hint="At least 2 characters" counter
                                                @click:append="show1 = !show1" class="px-5">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <p class="text-danger overline">{{error}}</p>
                                </v-container>
                            </v-container>
                        </v-container>
                    </v-form>
                    <v-row>
                        <v-col class="d-flex justify-center">
                            <v-btn class="d-flex right primary mb-3" @click="login()" :loading="loading"
                                :disabled="!valid">
                                <span>Login</span>
                                <v-icon right>login</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {
        mapActions
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
                userNameRules: [
                    v => !!v || 'Username is required',
                    // v => /^a-zA-Z0-9+$/.test(v) || 'Username must with character',
                    v => (v && v.length >= 5) || 'Name must be greater than 3 characters',
                ],
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                }
            }
        },
        methods: {
            ...mapActions(['signIn']),
            login() {
                this.error = '';
                if (this.inp.Username == '') {
                    this.error = 'Username is required';
                    return;
                } else if (this.inp.password == '') {
                    this.error = 'password is required';
                    return
                }
                this.signIn(this.inp).then(() => {
                    this.loading = false;
                    this.$router.replace({
                        name: 'candidateDashboard'
                    })
                    location.reload();
                }).catch(() => {
                    this.error = 'username and password not match !'
                })
            }
        },
    }
</script>