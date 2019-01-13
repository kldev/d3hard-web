<template>
  <div id="playerAdd" class="component-player-add">

     <div>
          <input class="input-filter" v-model="filter.btag" type="text" v-bind:placeholder="$t('rank.btag.filter')" />
          <span v-if="!busy" class="btn" @click="onAdd()"> {{ $t('btn.ok') }} <i class="material-icons">check_circle</i> </span>
          <span v-if="!busy" class="btn" @click="onCancel()"> {{ $t('btn.cancel') }} <i class="material-icons">cancel</i> </span>
      </div>

      <div v-if="busy">
         {{ $t('player.add.or.update.in.progres') }}
      </div>

      <div>
       {{ $t('heros.update.legend') }}
      </div>
  </div>
</template>

<script lang="ts">

import { RankModelRequest } from '@/model/RankModelRequest';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getRankListFilter, getBusy } from '@/storeGetters';
import { setRankListFilter, setShowAdd, setBusy } from '@/storeMutations';
import { createOrUpdatePlayer } from '@/storeActions';
//import {}

@Component
export default class PlayerAdd extends Vue {

    private set filter(value: RankModelRequest) {
        this.$store.commit(setRankListFilter, value);
    }

    private get filter(): RankModelRequest {
        return this.$store.getters[getRankListFilter] as RankModelRequest;
    }

  private onCancel(){
    this.$store.commit(setShowAdd, false);
  }


  private onAdd(): void {
    this.$store.dispatch(createOrUpdatePlayer);
  }

  private get busy():boolean {
    return this.$store.getters[getBusy] as boolean;
  }
}
</script>