<template>
  <div id="ranking">

    <div id="top"> <!-- top -->
        <div id="title">
           {{ $t('main.title.ranking') }}
        </div>
    
        <RankFilter v-if="showAdd == false" />
        <PlayerAdd v-if="showAdd" />
    </div>

    <div id="middle">
        <Rank v-if="showAdd == false" />
    </div>

    <div id="footer">
    </div>
    
  
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Rank from './Rank.vue';
import RankFilter from './RankFilter.vue';
import PlayerAdd from './PlayerAdd.vue';

import {  getShowAdd } from '@/storeGetters';
import {  getSeasonalConfig } from '@/storeActions';

@Component({
  components: {
    Rank,
    RankFilter,
    PlayerAdd,
  },
})
export default class Main extends Vue {

  private get showAdd(): boolean {
    return this.$store.getters[getShowAdd] as boolean;
  }

  private mounted(): void {
      this.$store.dispatch(getSeasonalConfig);
  }

}
</script>

<style lang="scss">
</style>
