<template>
  <nav>

    <!-- snackbar alerts -->
    <v-snackbar v-model="snackbar" centered color="#4DB6AC" class="overline font-weight-black" top>
      {{message}}
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snackbar = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>

    <v-app-bar class="grey lighten-3" flat>
      <template>
        <v-app-bar-nav-icon fab small color="black" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
      </template>

      <v-toolbar-title class="to-uppercase mr-3" outlined>
        <v-chip large>
          <span large class="font-weight-bold">A_</span>
          <span class="font-weight-light font-weight-medium text--secondary">dmin</span>
        </v-chip>
      </v-toolbar-title>

      <v-toolbar-items class="d-flex justify-start mt-5">
        <!-- 
        <router-link to="/" class="font-weight-medium black--text text--secondary subtitle-1  mt-5 pr-4">Home
        </router-link> -->
        <!-- <v-icon  class="pr-5">home</v-icon> -->


      </v-toolbar-items>
      <v-spacer></v-spacer>
      <template class="mt-5">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-avatar v-if="admin_authenticated" color="grey" class="font-weight-black overline white--text mr-2" x-large>
          {{admin.Username[0]}}</v-avatar>
        <!-- <login_com v-if="!admin_authenticated"></login_com> -->
      </template>


      <template>
        <v-menu offset-y open-on-hover class="mt-5">
          <template v-slot:activator="{ on, attrs }">
            <span dark v-bind="attrs" v-on="on" class="text--secondary d-none d-sm-flex">
              Menu
              <v-icon color="black">mdi-chevron-down</v-icon>
            </span>
          </template>

          <v-list>
            <v-list-item>
              <router-link to="/admin_dashboard" class="black--text subtitle-1">Dashboard
                <v-icon right small>dashboard</v-icon>
              </router-link>
            </v-list-item>

            <v-list-item>
              <router-link to="/#" class="black--text subtitle-1">user setting
                <v-icon right small>settings</v-icon>
              </router-link>

            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="signOutAction">logout
              <v-icon right small>logout</v-icon>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary absolute>
      <v-layout column align-center class="transparent" src="/intro.jpg">
        <v-img src="/intro.jpg">
          <div class=" d-flex justify-content-center mt-5">
            <v-avatar>
              <v-icon right x-large>admin_panel_settings</v-icon>
            </v-avatar>
          </div>
          <div class=" d-flex justify-content-center mt-5">
            <span v-if="admin_authenticated"
              class="white--text overline font-weight-bold text-secondary mb-5">{{admin.email}}
            </span>
          </div>
        </v-img>
      </v-layout>
      <v-divider></v-divider>
      <v-list nav dense>

        <v-list-item-group v-if="role === 'admin'" active-class="deep-purple--text text--accent-4">
          <v-list-item router to="admin_dashboard">
            <v-list-item-icon>
              <v-icon>dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item router to="createElection">
            <v-list-item-icon>
              <v-icon>reduce_capacity</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">Create Election</v-list-item-title>
          </v-list-item>
          <v-list-item router to="ManageElection">
            <v-list-item-icon>
              <v-icon>build</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">Manage Election</v-list-item-title>
          </v-list-item>

          <v-list-item router to="candidates">
            <v-list-item-icon>
              <v-icon>supervised_user_circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">Candidates</v-list-item-title>
          </v-list-item>

          <v-list-item router to="husuMemebers">
            <v-list-item-icon>
              <v-icon>group</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">HUSU MEMEBERS</v-list-item-title>
          </v-list-item>

        </v-list-item-group>

      </v-list>
      <template v-if="admin_authenticated" v-slot:append>
        <div class="pa-2 d-flex justify-content-center">
          <v-btn block outlined @click="signOutAction" class="overline">
            Logout
            <v-icon right>logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>
<script>
  import {
    Bus
  } from '../../main'
  import {
    mapGetters,
    mapActions
  } from 'vuex';

  export default {
    name: 'test',
    data: () => ({
      role: localStorage.getItem('role'),
      snackbar: false,
      active: false,
      drawer: false,
      right: false,
      message: ''

    }),

    computed: {
      ...mapGetters(['admin_authenticated', 'admin', 'categories'])
    },
    created() {
      this.fatchCategories();

      Bus.$on('alertUser', (data) => {
          this.message = data;
          this.snackbar = true;
        }),
        Bus.$on('updated', (data) => {
          this.message = data;
          this.snackbar = true;
        })
      Bus.$on('data_posted', (data) => {
        this.message = data;
        this.snackbar = true;
      })
      Bus.$on('ElectionCreated', (data) => {
        this.message = data;
        this.snackbar = true;
      })
      Bus.$on('UpdatePost', (data) => {
        this.message = data;
        this.snackbar = true;
      })
      Bus.$on('candidate_delete', (data) => {
        this.message = data;
        this.snackbar = true;
      })


    },
    methods: {
      ...mapActions(['signOut', 'fatchCategories']),

      signOutAction() {
        this.signOut().then(() => {

          this.$router.replace({
            name: 'Home'
          })
          location.reload();
        }).then((e) => {
          this.drawer = false;
          console.log(e);
        })
      },

    }
  }
</script>

<style scoped>
  .router-link-active {
    text-decoration: underline;
  }

  h4 {
    color: green;
  }

  /* text-uppercase white--text text-decoration-none pl-5 subtitle-1 mt-3 router-link-exact-active router-link-active */
  a .router-link-exact-active {
    text-decoration: underline;
  }
</style>