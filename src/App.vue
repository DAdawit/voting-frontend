<template>
    <v-app style="background: #F5F5F5;">
        <Navbar v-if="role === 'voter' || role ==='candidate' || role === null"  />
        <Admin_nav v-if="role==='admin' "  />
        <v-main class="px-5">
            <router-view></router-view>
        </v-main>
        <foot_bar />
    </v-app>
</template>

<script>
    // import {
    //     mapGetters
    // } from 'vuex';
    import Navbar from './views/nav2';
    import Admin_nav from './views/Admin/admin_nav';

    import foot_bar from '@/components/foot-bar.vue';
    export default {
        data() {
            return {
                role:''
            }
        },
        components: {
            Navbar,
            Admin_nav,
            foot_bar,
    
        },
        computed: {
            // ...mapGetters(['user'])
        },
        mounted() {
                this.role=localStorage.getItem('role')
        },
        updated(){
                this.role=localStorage.getItem('role')
        }

    }
</script>
<style>
    #app {
        background-color: var(--v-background-base);
    }
</style>