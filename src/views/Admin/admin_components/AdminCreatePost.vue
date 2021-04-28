<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="900" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Create Post
                    <v-icon right>post_add</v-icon>
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Create Post
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="registerForm" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="post.title" label="Post Title" :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea v-model="post.description" label="Post Body" :rules="[rules.required]"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
        <p class="text-danger overline ml-5">{{error}}</p>
                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="createPost()" :disabled="!valid">
                        Post
                          <v-icon right>post_add</v-icon>
                    </v-btn>
                    <v-btn color="primary" @click="dialog = false">
                        Cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import {Bus} from '../../../main';
import {mapActions} from 'vuex';
    export default {
        data() {
            return {
                dialog: false,
                valid: true,
                error:'',
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
                post:{
                    title:'',
                    description:''
                }
            }
        },
        methods:{
            ...mapActions(['postInfo']),
            createPost(){
                if(this.post.title == '' || this.post.description == ''){
                     this.error='all input must be filled';
                     return;
                }
                this.postInfo(this.post).then(()=>{
                    this.post.title='';
                    this.post.description='';
                    this.valid=true;
                    this.dialog=false;
                    Bus.$emit('data_posted','success')
                })
                console.log(this.post)
            }
        }
    }
</script>