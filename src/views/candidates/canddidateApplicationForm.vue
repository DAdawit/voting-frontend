<template>
    <div>
        <v-container>
            <v-card height="400px" width="1200" class="d-flex justify-content-center">
                <v-row class="d-flex justfy-center">
                    <v-col cols="12" class="d-flex justify-center align-center">
                        <span class="display-2 text--secondary"> Upload your grade report</span>
                       
                    </v-col>

                    <v-col class="d-flex justify-center">
                        <div>
                        <input type="file" class="form-control-file" @change="imageChange"><br>
                        <v-btn color="primary" @click="submitGradeReport()" :loading="loading">submint</v-btn>
                        </div>
                    </v-col>

                </v-row>
            </v-card>
        </v-container>
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
                loading: false,
                profile_image: {
                    user_id: '',
                    image: null
                }
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            ...mapActions(['storeGrade']),
            imageChange(e) {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0])
                reader.onload = (e) => {
                    this.profile_image.image = e.target.result
                    // this.editItems.image = e.target.result
                }
            },

            submitGradeReport() {
                this.loading = true;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                this.profile_image.user_id = this.user.id;
                this.storeGrade(this.profile_image, config).then(() => {
                    // alert('hello')
                    this.loading = false;
                    this.$router.replace({
                        name: 'complete_profile'
                    })
                });
            }
        }
    }
</script>