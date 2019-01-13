<template>
  <div id="app">
   <Main />
  </div>
  
</template>

<script lang="ts">
import Main from '@/components/Main.vue';

import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Main,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
