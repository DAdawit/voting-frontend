<template>
    <v-container fluid>
        <form @submit.prevent="submit">
      
            <v-text-field v-model="inp.email" type="email" label="email" required></v-text-field>
            <v-text-field v-model="inp.password" type="password" label="password" required></v-text-field>

            <v-btn class="white--text pink" @click="submit">

                <span>Login</span>
                <v-icon right>login</v-icon>
            </v-btn>
            <br>
         
        </form>

        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" required>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Last name" required>
                        </v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    </v-col>
                 
                </v-row>
            </v-container>
        </v-form>
    </v-container>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    export default {
        name: 'signin',
        data() {
            return {
                error: '',
                inp: {
                    email: '',
                    password: ''
                }
            }
        },
        methods: {
            ...mapActions(['signIn']),
            submit() {
                this.signIn(this.inp).then(() => {
                        this.$router.replace({
                            name: 'dashboard'
                        })
                    })
                    .catch((e) => {
                        console.log(e);
                    })

            }
        }
    }
</script>

<style scoped>

</style>