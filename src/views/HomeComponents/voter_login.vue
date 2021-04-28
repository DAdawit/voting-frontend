<template>
  <div>
    <template>

      <div class="text-center mt-2">
        <!-- <v-img dark v-bind="attrs" v-on="on" src="/img/assets/main2.jpg"> -->
        <!-- <v-card class="px-4"> -->
          <v-img src="/image3.jpg" height="400">
          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-row class="d-flex justify-end">
              <v-col cols="5">
                <v-card class="transparent">
                  <v-card-title class="d-flex justify-center text-secondary display-1 ">LOGIN <v-icon right large>login
                    </v-icon>
                  </v-card-title>
                  <v-card-text>
                    <v-col cols="12" lg="12">
                      <v-col cols="12">
                        <v-text-field v-model="login.fullname" label="Full Name" required>
                        </v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="login.password" :append-icon="show1?'eye':'eye-off'"
                          :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                          label="Password *use UID* " hint="At least 4 characters" counter
                          @click:append="show1 = !show1">
                        </v-text-field>
                      </v-col>
                      <v-col class="d-flex" cols="12" sm="6" xsm="12">
                      </v-col>
                      <v-spacer></v-spacer>
                    <p class="text-danger overline">{{error}}</p>
                      <v-card-actions class="d-flex justify-center">
                        <v-btn large block :disabled="!valid" color="success" @click="validate"> Login
                          <v-icon right>login</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-card-text>
                </v-card>
              </v-col>

            </v-row>
          </v-form>
          </v-img>

        <!-- </v-card> -->
        <!-- </v-img> -->
      </div>
    </template>
  </div>
</template>
<script>
  import {
    mapActions, mapGetters
  } from 'vuex';
  export default {
    data() {
      return {
        dialog: false,
        valid: true,
        error:'',
        login: {},

        loginEmailRules: [
          v => !!v || "Required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        emailRules: [
          v => !!v || "Required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],

        show1: false,
        rules: {
          required: value => !!value || "Required.",
          min: v => (v && v.length >= 4) || "Min 4 characters"
        }

      }
    },
    computed: {
      ...mapGetters(['']),
      passwordMatch() {
        return () => this.password === this.verify || "Password must match";
      }
    },
    methods: {
      ...mapActions(['STUDENT_LOGIN']),
      validate() {
        if (this.$refs.loginForm.validate()) {
          console.log(this.login);
          this.STUDENT_LOGIN(this.login).then(() => {
            this.$router.replace({
              name: 'voteWaiting'
            })
            location.reload();
          }).catch((err)=>{
            this.error=err.response.data;
          })
        }
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
  /* Helper classes */
  /* .basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
} */
</style>