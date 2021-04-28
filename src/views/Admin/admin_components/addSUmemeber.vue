<template>
    <div>

        <div class="text-center">
            <v-dialog v-model="dialog" width="950">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                        Add memeber
                        <v-icon right>person_add_alt</v-icon>
                    </v-btn>
                </template>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-card outlined>
                        <v-card-title>
                            <span class="headline">Add HUSU Memeber</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="12">
                                        <v-text-field v-model="memeber.fullname" label="Fullname*"
                                            :rules="[rules.required]" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="memeber.college" label="College*"
                                            :rules="[rules.required]" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field v-model="memeber.department" label="Department*"
                                            :rules="[rules.required]" required>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="memeber.suid" label="SUID*" :rules="NumberRules"
                                            disabled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field v-model="memeber.id_number" label="ID Number" :rules="nameRules"
                                            required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-radio-group v-model="memeber.sex" label="sex" row>
                                            <v-radio label="Male" value="male"></v-radio>
                                            <v-radio label="Female" value="female"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="saveMemeber()" :disabled="!valid">Save
                                <v-icon right>save_alt</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>

            </v-dialog>
        </div>



        <v-container>


        </v-container>
    </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        data() {
            return {
                valid: true,
                dialog: false,
                memeber: {
                    fullname: '',
                    college: '',
                    department: '',
                    suid: null,
                    id_number: '',
                    sex: '',
                },
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
                Require: [
                    v => !!v || 'required',
                ],
                nameRules: [
                    v => !!v || 'required',
                ],
                NumberRules: [
                    v => !!v || 'required',
                    v => (v && v.length <= 8) || 'Name must be less than 8 characters',
                    v => /^[0-9][0-9 -/]*$/.test(v) || 'Only numbers allowed',
                ],
            }
        },
        methods: {
            ...mapActions(['storeMemeber','fetchHUSUMemebers']),

            saveMemeber() {
                this.storeMemeber(this.memeber).then(() => {
                    this.dialog=false;
                    this.$router.replace({
                        name: 'husuMemebers'
                    })
                }).then(()=>{
                    this.fetchHUSUMemebers();
                })
            }
        },
    }
</script>