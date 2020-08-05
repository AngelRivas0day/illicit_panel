<template>
  <div class="content">
    <BaseLoading v-if="isLoading" />
    <fade-transition v-show="!isLoading" :duration="100" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
  import {FadeTransition} from 'vue2-transitions';
  import BaseLoading from '@/components/Loading/BaseLoading';
  import { mapState } from 'vuex'

  export default {
    components: {
      FadeTransition,
      BaseLoading
    },
    computed: {
      ...mapState('loading',{
        isLoading: 'isLoading'
      })
    }
  };
</script>
