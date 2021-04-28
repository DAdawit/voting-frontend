<template>
  <v-container>
    <v-row class="d-flex justify-content-center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card class="pa-5" width="700">
          <p class="display-1 text--secondary d-flex d-flex justify-content-center">Set Contact Information</p>
          <v-container>
            <v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field v-model="profile.email" :rules="emailRules" label="E-mail*" required>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <v-text-field v-model="profile.phone_number" :counter="12" :rules="NumberRules" type="number"
                  label="Phone Number*" required></v-text-field>
              </v-col>
              <v-col cols="12" v-if="user.role == 'candidate'">
                <v-textarea v-model="profile.vision" label="Vision" hint="Your vision as a candidate" :rules="[rules.required]"></v-textarea>
              </v-col>
              <v-col cols="12" xs="12" md="12" lg="12">
                <label class="overline">upload profile picture <v-icon right>add_a_photo</v-icon></label>
                <input type="file" class="form-control-file" @change="imageChange">
              </v-col>
            </v-col>
          </v-container>
          <v-col cols="12" class="d-flex justify-content-center">
            <v-btn color="primary" @click="saveContact()" :loading="loading" :disabled="!valid">Save
              <v-icon right>save_alt</v-icon>
            </v-btn>
          </v-col>
          <small>*indicates required field</small>
        </v-card>
      </v-form>
    </v-row>

  </v-container>
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
        valid: true,
        profile: {
          user_id: '',
          email: '',
          phone_number: '',
          vision:'',
          profile_image: null
        },
        name: '',
         rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 5) || "Min 5 characters"
                },
        Require: [
          v => !!v || 'required',
        ],
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
      ...mapGetters(['user'])
    },
    methods: {
      ...mapActions(['storeContact']),
      imageChange(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = (e) => {
          this.profile.profile_image = e.target.result
          // this.editItems.image = e.target.result
        }
      },
      check() {
        this.show = true;
      },
      saveContact() {
        this.profile.user_id = this.user.id;
        this.loading = true;
        // console.log(this.profile)
        this.storeContact(this.profile).then(() => {
          this.loading = false;
          this.snackbar = true;
          this.$router.replace({
            name: 'candidateDashboard'
          })
          location.reload();
        });
      }
    },
  }
</script>