<template>
  <div id="playerRank" class="component-rank">
      <div>
          <input class="input-filter" v-model="filterBtag" type="text" v-bind:placeholder="$t('rank.btag.filter')" />
          <span class="btn" @click="onAddUpdate()">{{ $t('add.update.btag') }} <i class="material-icons">add_box</i> </span>
      </div>

       <div class="rank-nav">
          <span class="btn" @click="onPage(0)">{{$t('rank.first.page')}} |</span>
          <span class="btn" @click="onPageNext()">{{$t('rank.next.page')}} |</span>
          <span class="btn" @click="onPageBack()">{{$t('rank.back.page')}} </span>
      </div>

      <table class="table player-rank-table">
        <thead>
            <tr>
                <th></th>
                <th> {{$t('rank.btag')}}</th>  
                <th> {{$t('rank.guild')}} </th>
                <th class="th-orderable" @click="onChangeOrder(vOrderByType.rank)">               
                    {{ $t(columnRankLabel) }}     
                    <i v-if="orderBy === vOrderByType.rank && direction === 'asc'" class="material-icons">arrow_drop_down</i>
                    <i v-if="orderBy === vOrderByType.rank && direction === 'desc'"  class="material-icons">arrow_drop_up</i>  
                </th>         
                <th v-if="filter.seasonal === 'true'" ></th>       
              
                <th> {{$t('update.date')}}</th>
            
            </tr>
        </thead>
        <tbody>
              <tr v-for="item in list" :key="item.id" >
                  <td> {{item.position + 1 }} </td>
                  <td style="min-width: 200px;"> 
                      <a :href="link(item.btag)" target="_blank"> {{item.btag }}  </a></td>
                  <td> {{item.guild}} </td>
                  <td> {{item.rank }} </td>      
                    <td v-if="filter.seasonal === 'true'"> {{item.season}} </td>          
                  <td> {{item.updateDate }} </td>
              </tr>

        </tbody>

      </table>
   
  
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { RankModel } from '@/model/RankModel';
import { RankModelRequest } from '@/model/RankModelRequest';


import { loadRankList } from '@/storeActions';
import { getRankList, getRankListFilter } from '@/storeGetters';
import { setRankListFilter, setShowAdd } from '@/storeMutations';
import { OrderByType } from '@/model/OrderByType';
import { RankType } from '@/model/RankType';


@Component({

  components: {

  },
})
export default class Rank extends Vue {

    private filterBtag: string = '';
    private vOrderByType = OrderByType;

    private mounted(): void {

        this.filterBtag = this.filter.btag;
        this.load();
    }

    private load(): void {

       this.$store.dispatch(loadRankList);
    }

    private onPage(index: number): void {

        this.filter.offset = index;
        this.load();
    }

    private onPageNext(): void {
        this.onPage(this.filter.offset + 1);
    }

    private onPageBack(): void {
        if (this.filter.offset > 0) {
            this.onPage(this.filter.offset - 1);
        }
    }

    @Watch('filterBtag')
    private onBtagChange(value: string, oldValue: string) {
        this.filter.btag = value;
        this.filter.offset = 0;
        this.load();
    }

    private onChangeOrder(order: OrderByType): void {
        this.filter.orderBy = order;
        this.filter.direction = this.filter.direction === 'asc' ? 'desc' : 'asc';
        this.load();
    }

    private get direction(): string {
        return this.filter.direction;
    }

    private set direction(value: string) {
        this.filter.direction = value;
    }

    private get orderBy(): OrderByType {
        return this.filter.orderBy;
    }

    private set orderBy(value: OrderByType) {
        this.filter.orderBy = value;
    }

    private set filter(value: RankModelRequest) {
        this.$store.commit(setRankListFilter, value);
    }

    private get filter(): RankModelRequest {
        return this.$store.getters[getRankListFilter] as RankModelRequest;
    }

    private get list(): RankModel[] {
        return this.$store.getters[getRankList] as RankModel[];
    }

    private get columnRankLabel(): string {

        if (this.filter.rank === RankType.player) {
            return 'paragon.level';
        }

        if (this.filter.rank === RankType.hero) {
            return 'greater.rift';
        }

        return '';
    }

    private link(btag: string): string {
        return 'https://eu.diablo3.com/pl/profile/' + btag.replace('#', '-') + '/';
    }

    private onAddUpdate(): void {
        this.$store.commit('setShowAdd', true);
    }

}
</script>

<style lang="scss">
</style>
