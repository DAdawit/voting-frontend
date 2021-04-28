<template>
  <v-row justify="center">
    <template name="register">
      <v-dialog v-model="dialog" width="800">

        <v-card class="mx-auto mx-5" max-width="800">
          <v-card-title>
            <span class="text--secondary display-1">Register for candidate</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field v-model="reg.Username" :rules="userNameRules" maxlength="20" required class="px-5">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field v-model="reg.suid" type="number" :rules="[rules.required]" label="SUID" maxlength="20"
                      required class="px-5">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field v-model="reg.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Password" hint="At least 5 characters" counter @click:append="show1 = !show1" class="px-5"
                      required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Confirm Password" counter @click:append="show1 = !show1" class="px-5" required>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
            <v-col cols="12">
              <p class="text-danger overline">{{error}}</p>
            </v-col>
            <v-row>
              <v-col class="d-flex justify-center ">
                <v-btn class="primary" right :disabled="!valid" @click.prevent="validate()"
                  v-on:keyup.enter="validate()" :loading="loading">
                  Register
                  <v-icon right>login</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-row>
</template>
<script>
  import {
    Bus
  } from '../../main'
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {

    data: () => ({
      loading: false,
      error: '',
      post_id: '',
      reg: {
        Username: '',
        suid: null,
        password: '',
      },
      inp: {
        Username: '',
        password: ''
      },
      input: {},
      valid: true,
      dialog: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verify: "",
      loginPassword: "",
      loginEmail: "",
      ids: [],
      userNameRules: [
        v => !!v || 'Username is required',
        // v => /^a-zA-Z0-9+$/.test(v) || 'Username must with character',
        v => (v && v.length >= 5) || 'Name must be greater than 5 characters',
      ],
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
        min: v => (v && v.length >= 5) || "Min 5 characters"
      }
    }),
    computed: {
      ...mapGetters(['Su_union_ids']),
      passwordMatch() {
        return () => this.reg.password === this.verify || "Password must match";
      },
    },
    methods: {

      ...mapActions(['REGISTER_CANDIDATE', 'signIn', 'fetchSu_memeber_ids']),

      validate() {
        this.error = '';
        if (this.reg.Username == '' || this.reg.suid === '' || this.reg.password == '') {
          this.error = 'fill all the required filds !'
          return;
        }
        const ids = this.Su_union_ids.map(item => item.suid);
        // console.log(this.reg);
        if (ids.includes(parseInt(this.reg.suid))) {
          this.loading = true;
          this.reg.role = 'candidate';
          this.reg.account_status = 'pending'
          this.inp.Username = this.reg.Username;
          this.inp.password = this.reg.password;

          this.REGISTER_CANDIDATE(this.reg).then(() => {
            console.log(this.reg)
            this.error = '';
            this.loading = false;
            this.signIn(this.inp).then(() => {
              this.$router.replace({
                name: 'candidate_app_form'
              })
            })

          }).catch((err) => {
            this.error = '';
            if (err.response.data.errors) {
              this.loading = false;
              // console.log('username')
              this.error = err.response.data.errors.Username[0];
              return
            } else {
              this.loading = false;
              // console.log('already')
              this.error = err.response.data.alreadyApplied;
            }
          })
        } else {
          this.error = 'SUID not found !';
        }

        // this.loading = true
        this.inp.Username = this.reg.Username;
        this.inp.password = this.reg.password;
        // this.register(this.reg).then(() => {
        //   this.signIn(this.inp).then(() => {
        //     this.$router.replace({
        //       name: 'complete_profile'
        //     })
        //   })
        //   location.reload();
        //   this.loading = false;
        // });
      },
      reset() {
        this.$refs.form.reset();
      },
      resetValidation() {
        this.$refs.form.resetValidation();
      },
      logi() {
        this.signup = true;
        this.login = false;
      },
      sign() {
        this.login = true;
        this.signup = false;
      },
    },
    created() {
      this.fetchSu_memeber_ids();
      Bus.$on('register', (data) => {
        this.dialog = true;
        this.reg.election_id = data
      })
    },
    mounted() {},

  }
</script>