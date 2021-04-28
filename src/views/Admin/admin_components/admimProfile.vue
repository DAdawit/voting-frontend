<template>
    <v-card class="mx-auto" max-width="400" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">Admin</div>
                <v-list-item-title class="headline mb-1">{{adminProfile.fullname}}</v-list-item-title>
                <div class="ml-3">
                    <v-list-item-title>Email</v-list-item-title>
                    <v-list-item-subtitle class="ml-3 mb-1"> {{adminProfile.email}}
                    </v-list-item-subtitle>
                    <v-list-item-title>Phone Number</v-list-item-title>
                    <v-list-item-subtitle class="ml-3 mb-1"> {{adminProfile.phone_number}}
                    </v-list-item-subtitle>
                </div>
            </v-list-item-content>

            <v-list-item-avatar tile size="150" color="grey">
                <v-img class="white--text align-end" height="200px" :src="adminProfile.profile_image">
                </v-img>
                <v-card-title>Admin</v-card-title>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['adminProfile'])
        },
        methods: {
            ...mapActions(['fetchAdminProfile'])
        },
        created() {
            this.fetchAdminProfile();
        }
    }
</script>