<template>
  <div>
    <v-snackbar v-model="snackbar" centered color="#4DB6AC" class="overline font-weight-bold" top>
      Profile updated !
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snackbar = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>
    <v-row>
      <v-col cols="12" sm="12" md="6" lg="5" xl="5">
        <div class="d-flex justify-content-center my-5">
          <v-card class="transparent" width="600">
            <v-card-title class="d-flex justify-content-center">
              <v-avatar size="150">
                <img :src="MyContact.profile_image" alt="John">
              </v-avatar>
            </v-card-title>
            <v-card-text class=" text-center">
              <div class="d-flex justify-content-start">
                <v-icon class="pr-3 mb-2">email</v-icon> <span>{{MyContact.email}}</span>
              </div>
              <div class="d-flex justify-content-start">
                <v-icon class="pr-3 mb-2">phone</v-icon> <span>{{MyContact.phone_number}}</span>
              </div>
                <changePassword />
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6" lg="7" xl="7">
        <v-form ref="form" lazy-validation class="px-5 mt-5">
          <v-card class="pa-5 transparent ">
            <h1 class="subheading grey--text mb-2 ml-5 d-flex justify-content-center ">Edit Info</h1>
            <v-row>


              <v-col cols="12" xs="12" md="12" lg="12">
                <v-text-field v-model="MyContact.phone_number" :counter="12" :rules="NumberRules" type="number"
                  label="Phone Number*" required></v-text-field>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="12">
                <v-text-field v-model="MyContact.email"  :rules="emailRules" 
                  label="Email" required></v-text-field>
              </v-col>
              <v-col cols="12" v-if="user.role!=='admin'">
                <v-textarea v-model="MyContact.vision" label="Vision" hint="Your vision as a candidate" :rules="[rules.required]"></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <div class="d-flex justify-content-center my-5 pl-5">
                <v-row>

                  <span class="pr-5  font-weight-bold">change profile image</span>
                </v-row>
                <v-row class="ml-5">
                  <v-icon x-large left> add_a_photo</v-icon>
                  <input type="file" @change="imageChange" class="font-weight-bold">
                </v-row>
              </div>
            </v-row>
            <v-row class="d-flex justify-content-center my-5">
              <v-btn color="primary" :loading="loading" @click="update()">
                Update Profile
              </v-btn>
            </v-row>
          </v-card>
        </v-form>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import changePassword from '../pages/changePassword';
  import {
    mapActions,
    mapGetters
  } from 'vuex';

  export default {
    components:{
changePassword
    },
    data() {
      return {
        snackbar: false,
        profile: {},
        loading: false,
        updateProfileData: {
          profile_image: null
        },
        name: '',
         rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
        nameRules: [
          v => !!v || 'required',
          v => (v && v.length <= 15) || 'Name must be less than 15 characters',
        ],
        DescriptionRules: [
          v => (v && v.length <= 1000) || 'Description must be less than 1000 characters',
        ],
        NumberRules: [
          v => !!v || 'required',
          v => (v && v.length <= 15) || 'Name must be less than 12 characters',
          v => /^[0-9][0-9 -]*$/.test(v) || 'Only numbers allowed',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    computed: {
      ...mapGetters(['user', 'MyContact']),
    },
    methods: {
      ...mapActions(['checkMyContact', 'UpdateProfile', 'fetchMyContact']),

      imageChange(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          this.updateProfileData.profile_image = e.target.result
          // this.editItems.image = e.target.result
        }
      },
      update() {
        this.loading = true;
        this.updateProfileData.id = this.MyContact.id;
        this.updateProfileData.user_id = this.user.id;
        this.updateProfileData.email=this.MyContact.email;
        this.updateProfileData.phone_number = this.MyContact.phone_number;
        this.updateProfileData.vision=this.MyContact.vision;
        this.UpdateProfile(this.updateProfileData).then(() => {
          this.loading = false;
          this.snackbar = true;
        });
      }
    },
    created() {
      this.checkMyContact(this.user.id).then(() => {
        this.fetchMyContact(this.user.id);
      }).catch(() => {
        this.$router.replace({
          name: 'complete_profile'
        })
      })
    },
  }
</script>