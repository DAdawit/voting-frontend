<template>
    <div>
        <template>
            <div class="text-center">
                <v-dialog v-model="dialog" width="800" persistent>
                    <v-card>
                        <v-card-title class="headline grey lighten-2">
                            Edit Post
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-form ref="registerForm" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field v-model="editdata.title" label="Post Title"
                                                :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="editdata.description" label="Post Body"
                                                :rules="[rules.required]"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="EditPost()">
                                update
                                <v-icon right>edit</v-icon>
                            </v-btn>
                            <v-btn color="primary" text @click="dialog = false">
                                cancel
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>

        <template>
            <v-row class="pt-5 mx-5">
                <v-col v-for="post in adminPosts" :key="post.id" cols="12" sm="12" md="12" lg="12">
                    <v-item cols="12" sm="12" md="12" lg="12">
                        <v-card class="mx-auto">
                            <v-card-title>{{post.title}}</v-card-title>
                            <v-card-subtitle class="pb-0">{{post.description}}</v-card-subtitle>
                            <v-card-text class="ml-2">
                                posted on : {{post.created_at}}<br>
                            </v-card-text>

                            <v-card-actions v-if="role === 'admin'" class="d-flex justify-end">
                                <v-btn color="primary" @click="editPost(post)">
                                    Edit
                                    <v-icon right>edit</v-icon>
                                </v-btn>
                                <v-btn color="red darken-4" class="white--text" @click="deletePost(post.id)">
                                    delete
                                    <v-icon right color="white">delete</v-icon>
                                </v-btn>
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
    } from '../../../main';
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    export default {
        data() {
            return {
                dialog: false,
                valid: true,
                role:localStorage.getItem('role'),
                editdata: {
                    title: '',
                    description: '',
                    post_id: ''
                },
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
            }

        },
        computed: {
            ...mapGetters(['adminPosts'])
        },
        methods: {
            ...mapActions(['fetchAdminPosts', 'EditAdminPost','DeletePost']),
            editPost(data) {
                this.dialog = true;
                this.editdata.post_id = data.id;
                this.editdata.title = data.title;
                this.editdata.description = data.description;
            },
            EditPost() {
                this.EditAdminPost(this.editdata).then(() => {
                    this.dialog = false;
                    Bus.$emit('UpdatePost', 'Posts Updated !');
                })
            },
            deletePost(id){
                this.DeletePost(id).then(()=>{
                    this.fetchAdminPosts();
                })
            }
        },
        created() {
            this.fetchAdminPosts()
        }
    }
</script>