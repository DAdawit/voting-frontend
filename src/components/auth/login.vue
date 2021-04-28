<template>
    <v-container>
        <v-card class="mt-4 px-5">
            <v-card-text>
                <v-form ref="loginForm" v-model="valid" lazy-validation>
                    <v-row class="pa-5">
                        <v-card-title class="display-1 pl-5">
                            Login
                        </v-card-title>
                        <v-col cols="12">
                            <v-text-field v-model="inp.email" :rules="loginEmailRules" class="px-5" label="E-mail"
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="inp.password" :append-icon="show1?'eye':'eye-off'"
                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Password" hint="At least 2 characters" counter
                                @click:append="show1 = !show1" class="px-5"></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                            <v-btn large block :disabled="!valid" color="indigo lighten-1 white--text" @click="submit">
                                <span>login</span>
                                <v-icon right>login</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <router-link to="/signupf" class="pa-3 blue--text">
                            <span class="text-decoration-underline  font-weight-bolder">
                                Create Account
                            </span>
                        </router-link>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {

                inp: {
                    email: '',
                    password: ''
                },
                valid: true,


                verify: "",

                loginEmailRules: [
                    v => !!v || "Required",
                    v => /.+@.+\..+/.test(v) || "E-mail must be valid"
                ],
                show1: false,
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 2) || "Min 2 characters"
                }

            }
        },
        computed: {
            passwordMatch() {
                return () => this.password === this.verify || "Password must match";
            }
        },
        methods: {
            ...mapActions(['signIn']),
            submit() {
                this.signIn(this.inp).then(() => {
                        this.$router.replace({
                            name: 'dashboard'
                        })
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            },

            validate() {
                if (this.$refs.loginForm.validate()) {
                    // submit form to server/API here...
                }
            },
            reset() {
                this.$refs.form.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            }
        }

    }
</script>

<style scoped>

</style>
