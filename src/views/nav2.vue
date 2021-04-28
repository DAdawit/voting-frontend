<template>
  <nav>

    <!-- snackbar acution adde alert -->
    <v-snackbar v-model="snackbar" centered color="#4DB6AC" class="overline font-weight-black" top>
      {{message}}
      <template v-slot:action="{ attrs }">
        <v-icon color="white" text v-bind="attrs" @click="snackbar = false">
          clear
        </v-icon>
      </template>
    </v-snackbar>
    <v-app-bar flat class="grey lighten-2">
      <template v-if="role === 'voter' || role === 'candidate'">
        <v-app-bar-nav-icon fab class="blue lighten-1" small color="white" @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>
      </template>

      <v-toolbar-title class="to-uppercase mr-3" outlined>
        <v-chip large>
          <span large class="font-weight-bold">HUSU</span>
          <span class="font-weight-light font-weight-medium text--secondary">_VOTING</span>
        </v-chip>
      </v-toolbar-title>

      <v-toolbar-items class="d-flex justify-start mt-5">
        <router-link to="/" class="font-weight-medium black--text text--secondary overline  mt-5 pr-5">Home
        </router-link>
        <router-link to="/news" class="font-weight-medium text--secondary black--text overline mt-5  pr-5">
          NEWS
        </router-link>
        <router-link to="/candidate_registration"
          class="font-weight-medium text--secondary black--text overline mt-5  pr-5">
          Election
        </router-link>
        <router-link to="/voteWaiting" class="font-weight-medium text--secondary black--text overline mt-5  pr-5">
          VOTING
        </router-link>

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

        <template v-if="authenticated">
          <v-avatar v-if="role==='voter'" color="grey" class="font-weight-black overline white--text mr-2" x-large>
            {{user.fullname[0]}}</v-avatar>
          <v-avatar v-if="role ==='candidate'" color="grey" class="font-weight-black overline white--text mr-2" x-large>
            {{user.Username[0]}}</v-avatar>
        </template>
      </template>


      <template v-if="role !== null">
        <v-menu offset-y open-on-hover class="mt-5">
          <template v-slot:activator="{ on, attrs }">
            <span dark v-bind="attrs" v-on="on" class="text--secondary d-none d-sm-flex">
              Menu
              <v-icon color="black">mdi-chevron-down</v-icon>
            </span>
          </template>
          <v-list>
            <v-list-item v-if="role === 'candidate'">
              <router-link to="/candidateDashboard" class="black--text subtitle-1">Dashboard
                <v-icon right small>dashboard</v-icon>
              </router-link>
            </v-list-item>
            <v-list-item v-if="role === 'candidate'">
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
            <v-chip large outlined color="green lighten-4">
              <span large class="font-weight-black amber--text">HUSU</span>
              <span class="font-weight-light  overline amber--text">VOTING</span>
              <v-icon right large color="orange lighten-1">gavel</v-icon>
            </v-chip>
          </div>

          <div class=" d-flex justify-content-center mt-5">
            <span v-if="authenticated" class="white--text overline font-weight-bold text-secondary mb-5">{{user.email}}
            </span>
          </div>
        </v-img>
      </v-layout>
      <v-flex>
        <v-row class="d-flex justify-content-center mt-5 ">
        </v-row>
      </v-flex>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item router to="/">
            <v-list-item-icon>
              <v-icon>home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">Home</v-list-item-title>
          </v-list-item>

        </v-list-item-group>



        <v-list-item-group v-if="authenticated" active-class="deep-purple--text text--accent-4">
          <v-list-item router to="candidateDashboard">
            <v-list-item-icon>
              <v-icon>dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item router to="profile">
            <v-list-item-icon>
              <v-icon>settings</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="overline font-weight-bold text-secondary">Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-if="authenticated" v-slot:append>
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
  } from '../main';
  import {
    mapGetters,
    mapActions
  } from 'vuex';

  export default {
    data: () => ({
      snackbar: false,
      role: localStorage.getItem('role'),
      active: false,
      drawer: false,
      right: false,
      message: '',
      items: [{
          title: 'Home',
          icon: 'home',
          route: '/'
        }, {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          route: '/dashboard',
          show: 'authenticated'
        },
        {
          title: 'my profile',
          icon: 'person',
          route: 'profile'
        },

      ],

    }),

    computed: {
      ...mapGetters(['authenticated', 'user'])
    },
    created() {
      Bus.$on('passwordCahnged', (() => {
        this.message = 'password is changed';
        this.snackbar = true;
      }))

      Bus.$on('campaign_updated', ((data) => {
        this.message = data;
        this.snackbar = true;
      }))

      Bus.$on('vote_success', ((data) => {
        this.message = data;
        this.snackbar = true;
      }))
    },
    methods: {
      ...mapActions(['signOut']),
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
      snackbarclose() {
        this.drawer = false;
        this.snackbar_pro_added = true;
      }
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