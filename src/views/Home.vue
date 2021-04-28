<template>
  <div>
    <template v-if="role !== 'voter'">
      <voter_login />
    </template>
    <activeCandidates />
  </div>
</template>

<script>
  import voter_login from './HomeComponents/voter_login'
  import activeCandidates from './HomeComponents/CandidatesList';
import {mapGetters } from 'vuex';
  // import Tem from '../components/tem.vue';
  export default {
    data() {
      return {
        role: localStorage.getItem('role'),
      }
    },
    computed:{
      ...mapGetters(['admin_authenticated','authenticated','student_authenticated'])
    },
    components: {
      voter_login,
      activeCandidates
    }
  }
</script>