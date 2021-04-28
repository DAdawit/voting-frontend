<template>
    <div>

<v-container>
    <v-row class="d-flex justify-end">
            <addMemeber />
    </v-row>
</v-container>

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

        <!-- edit dialog -->

        <template>
            <div class="text-center">
                <v-dialog v-model="dialog" width="800">
                    <v-card>
                        <v-card-title class="headline grey lighten-2">
                            Edit
                        </v-card-title>
                        <v-card-text>
                            <v-card-text>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    editdata<v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="12">
                                                <v-text-field v-model="editdata.fullname" label="Fullname*" required>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editdata.college" label="College*" required>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field v-model="editdata.department" label="Department*"
                                                    required>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field v-model="editdata.suid" label="SUID*" disabled>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field v-model="editdata.id_number" label="ID Number" required>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-radio-group v-model="editdata.sex" label="sex" row>
                                                    <v-radio label="Male" value="male"></v-radio>
                                                    <v-radio label="Female" value="female"></v-radio>
                                                </v-radio-group>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*indicates required field</small>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="dialog=false">cancel
                                </v-btn>
                                <v-btn color="primary" @click="updateData()">update
                                    <v-icon right>edit</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
        </template>


        <v-container class="mt-5">
            <v-simple-table fixed-header height="400px">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Fullname</th>
                            <th class="text-left">College</th>
                            <th class="text-left">Departement</th>
                            <th class="text-left">Sex</th>
                            <th class="text-left">Id_number</th>
                            <th class="text-left">SUID</th>
                            <th class="text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="memeber in HUSUMemebers" :key="memeber.id">
                            <td>{{ memeber.fullname }}</td>
                            <td>{{ memeber.college }}</td>
                            <td>{{ memeber.department }}</td>
                            <td>{{ memeber.sex }}</td>
                            <td>{{ memeber.id_number }}</td>
                            <td>{{ memeber.suid }}</td>
                            <td>
                                <v-btn icon color="orange" @click="edit(memeber)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                                <v-btn icon color="red" @click="deleteMeme(memeber.id)">
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
import addMemeber from './addSUmemeber'
    import {
        Bus
    } from '../../../main';
    import {
        mapActions,
        mapGetters
    } from 'vuex';
    export default {
        components:{
            addMemeber  
        },
        data() {
            return {
                valid:true,
                dialog: false,
                editdata: {},
                memeber_id: '',
                show_alert: false,
                alert_dialog: false
            }
        },
        computed: {
            ...mapGetters(['HUSUMemebers'])
        },

        methods: {
            ...mapActions(['fetchHUSUMemebers', 'updateMemeber','DeleteMemeber']),
            edit(data) {
                this.editdata.id = data.id;
                this.editdata.fullname = data.fullname;
                this.editdata.college = data.college;
                this.editdata.department = data.department;
                this.editdata.suid = data.suid;
                this.editdata.id_number = data.id_number;
                this.editdata.sex = data.sex;
                this.dialog = true;
            },
            updateData() {
                this.updateMemeber(this.editdata).then(() => {
                    Bus.$emit('updated', 'Updated successfully')
                    this.dialog = false;
                })
            },

            deleteMeme(id) {
                this.memeber_id = id;
                this.show_alert = true,
                this.alert_dialog = true
            },
            close_alert(){
                this.memeber_id='';
                this.show_alert=false;
                this.alert_dialog=false;
            },
            submit(){
                // this.DeleteMemeber(this.memeber_id)
                this.DeleteMemeber(this.memeber_id).then(()=>{
                    Bus.$emit('memeberDeleted','Memeber Deleted')
                    this.memeber_id='';
                    this.show_alert=false;
                    this.alert_dialog=false;
                })
            }
        },
        created() {
            this.fetchHUSUMemebers();
        }
    }
</script>