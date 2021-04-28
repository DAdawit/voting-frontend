<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn small color="primary" dark v-bind="attrs" v-on="on">
                    change password
                    <v-icon right>build</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="d-flex justify-content-center text-secondary">
                    Change password
                </v-card-title>

                <v-container>
                    <v-container>
                        <v-form ref="registerForm" v-model="valid" lazy-validation>
                            <v-row>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row class="d-flex justify-content-center">
                                        <v-col cols="12" sm="10" md="10" lg="10">
                                            <v-text-field v-model="user.oldPassword"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                                name="input-10-1" label="old password" hint="At least 5 characters"
                                                counter @click:append="show1 = !show1" class="px-5">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="10" md="10" lg="10">
                                            <v-text-field v-model="user.newPassword"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                                name="input-10-1" label="new password" hint="At least 5 characters"
                                                counter @click:append="show1 = !show1" class="px-5">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="10" md="10" lg="10">
                                            <v-text-field block v-model="verify"
                                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :rules="[rules.required, passwordMatch]"
                                                :type="show1 ? 'text' : 'password'" name="input-10-1"
                                                label="verify Password" counter @click:append="show1 = !show1"
                                                class="px-5">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-form>

                            </v-row>
                            <v-row class="d-flex justify-content-center">
                                <p class="text-danger small overline">{{error}}</p>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="dialog = false">
                                    cancel
                                </v-btn>
                                <v-btn color="primary" text @click="changePassword()" :disabled="!valid"
                                    :loading="loading">
                                    save
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-container>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import {
        Bus
    } from '../../main'
    import {
        mapGetters,
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
                dialog: false,
                verify: "",
                valid: true,
                show: false,
                error: '',
                loading: false,
                show1:false,
                user: {
                    oldPassword: "",
                    newPassword: "",
                    user_id: ''
                }
            }
        },
        computed: {
            ...mapGetters(['user']),
            passwordMatch() {
                return () => this.user.newPassword === this.verify || "Password must match";
            },
        },
        methods: {
            ...mapActions(['CangeUserPassword']),
            changePassword() {
                if(this.user.oldPassword==this.user.newPassword){
                    this.error='old password and new password same'
                    return;
                }
                this.loading=true;
                this.user.user_id = this.user.id;
                this.CangeUserPassword(this.user).then(() => {
                    Bus.$emit('passwordCahnged')
                    this.dialog = false;
                    this.loading = false;
                    this.user.oldPassword = ""
                    this.user.newPassword = ""
                    this.verify='';

                }).catch((err) => {
                    this.error = err.response.data.error;
                    this.loading = false;
                });
            }
        },

    }
</script>