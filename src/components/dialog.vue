<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="520px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined v-bind="attrs" v-on="on" class="text--secondary">
          Sign In
          <v-icon right>login</v-icon>
        </v-btn>
      </template>

      <template v-if="signup" justify="center" name="register">
        <v-card class="mx-auto" max-width="520">
          <v-card-title>
            <v-icon large left>
              person_add
            </v-icon>
            <span class="headline">SignUp</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="reg.name" :rules="[rules.required]" label="User Name" maxlength="20" required
                    class="px-5">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6" lg="6">
                  <v-text-field v-model="reg.email" :rules="emailRules" label="E-mail" required class="px-5">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-text-field v-model="reg.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                    label="Password" hint="At least 5 characters" counter @click:append="show1 = !show1" class="px-5">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" lg="12">
                  <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                    label="Confirm Password" counter @click:append="show1 = !show1" class="px-5">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-row>

              <v-col class="d-flex justify-center ">
                <v-btn class="primary" right @click="validate()" v-on:keyup.enter="validate()" :loading="loading">
                  <span>SignUp</span>
                  <v-icon right>create</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <row>
              <v-col>
                <a @click="sign()" class="link text-decoration-underline pa-3 blue--text font-weight-bolder">Already
                  have an account!
                </a>
              </v-col>
            </row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click="dialog = false" small>Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>

      <template v-if="login" name="login">
        <v-card class="mx-auto" max-width="520">
          <v-card-title>
            <v-icon large left>
              login
            </v-icon>
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-container>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-text-field v-model="inp.email" :rules="loginEmailRules" class="px-5" label="E-mail" required>
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="inp.password" :append-icon="show1?'eye':'eye-off'"
                        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                        label="Password" hint="At least 2 characters" counter @click:append="show1 = !show1"
                        class="px-5">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <p class="text-danger small">{{error}}</p>
                </v-container>
              </v-container>
            </v-container>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn class="d-flex right primary" @click="submit()" :loading="loading" :disabled="!valid">
                  <span>Login</span>
                  <v-icon right>login</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <a @click="logi()" class="link text-decoration-underline pa-3 blue--text font-weight-bolder">
                  Create Account
                </a>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" class="primary" @click="dialog = false" small>Close</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-row>
</template>

<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  export default {
    data: () => ({
      loading: false,
      error: '',
      tabs: [{
          name: "Login",
          icon: "mdi-account"
        },
        {
          name: "Register",
          icon: "mdi-account-outline"
        }
      ],
      login: true,
      signup: false,
      reg: {

        name: '',
        email: '',
        password: '',
        usefor: ''
      },
      inp: {
        email: '',
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
      ...mapGetters(['user']),
      passwordMatch() {
        return () => this.password === this.verify || "Password must match";
      },
    },
    methods: {
      ...mapActions(['register', 'signIn']),
      submit() {
        if (this.inp.email === '' || this.inp.password === '') {
          this.error = "Email and password fild empty fild !"
        } else {
          this.signIn(this.inp).then((res) => {
              console.log(res)
              this.loading = false;
              if (this.user.role === 'admin') {
                this.$router.replace({
                  name: 'admin_dashboard'
                })
                location.reload();
              }else if(this.user.role=='user'){
                this.$router.replace({
                  name:'dashboard'
                })
              }

            })
            .catch((e) => {
              console.log(e);
              this.error = "Email and password not match!"
            })
        }
      },
      validate() {
        console.log(this.reg)
        this.loading = true
        this.inp.email = this.reg.email;
        this.inp.password = this.reg.password;
        this.register(this.reg).then(() => {
          this.signIn(this.inp).then(() => {
            this.$router.replace({
              name: 'complete_profile'
            })
          })
            location.reload();
          this.loading = false;
        });
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
    }

  }
</script>