<template color="grey lighten-3 ">
    <v-container>
        <v-container>
            <v-card class="px-4 mt-4">
                <v-card-text>
                    <v-form ref="registerForm" v-model="valid" lazy-validation>
                        <v-card-title class="display-1 ">
                            Create Account
                        </v-card-title>
                        <v-row class="px-5">
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="reg.uName" :rules="[rules.required]" label="User Name"
                                    maxlength="20" required class="px-5"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="reg.email" :rules="emailRules" label="E-mail" required class="px-5">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="reg.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Password" hint="At least 5 characters" counter
                                    @click:append="show1 = !show1" class="px-5"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"
                                    class="px-5">
                                </v-text-field>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                <v-btn large block :disabled="!valid" color="indigo lighten-1 white--text"
                                    @click="validate">
                                    <span>Register</span>
                                    <v-icon right>create</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <router-link to="/loginf" class="pa-3 blue--text">
                                <span class="text-decoration-underline  font-weight-bolder">Already have an account
                                    !</span>
                            </router-link>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-container>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex';
    export default {
        data() {
            return {
              reg:{
                  uName:'',
                  email:'',
                  password:''

              },
                tab: 0,
                tabs: [{
                        name: "Login",
                        icon: "mdi-account"
                    },
                    {
                        name: "Register",
                        icon: "mdi-account-outline"
                    }
                ],
                valid: true,

                verify: "",
                loginPassword: "",
                loginEmail: "",
                loginEmailRules: [
                    v => !!v || "Required",
                    v => /.+@.+\..+/.test(v) || "E-mail must be valid"
                ],
                emailRules: [
                    v => !!v || "Required",
                    v => /.+@.+\..+/.test(v) || "E-mail must be valid"
                ],
                 phoneRules: [
                    v => !!v || "Required",
                    v => /^[+]*[0-9]*$/.test(v) || "Phone number must be valid"
                ],


                show1: false,
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                }

            }
        },
        computed: {
            passwordMatch() {
                return () => this.reg.password === this.verify || "Password must match";
            }
        },
        methods: {
            ...mapActions(['register']),
            validate() {
                console.log(this.reg);
                // if (this.$refs.loginForm.validate()) {
                    this.register(this.reg).then((res)=>{
                      console.log(res);
                        this.$router.replace({
                          name:'dashboard'
                        })
                    }).catch((e)=>{
                      console.log(e);
                    })

            },
            reset() {
                this.$refs.form.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            }
        },

    }
</script>

<style>

</style>
