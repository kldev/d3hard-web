<template>
    <div >    
        <code style="display: none">
        {{ filter.rank }} 
        {{ filter.orderBy }} 
        {{ filter.hero }} 
        {{ filter.seasonal }} 
        {{ filter.season }} 
        {{ filter.hardcore }}
        </code>
        <div style="display: flex; direction: column; flex-wrap: wrap;">
            <div class="rank-view-select-box">
                <span class="btn btn-select-rank-type" v-bind:class="{'rank-selected': filter.rank === vRankType.player  }" @click="onSelectRank(vRankType.player)">
                    {{$t('rankType.player')}}</span> |
                <span class="btn btn-select-rank-type" v-bind:class="{'rank-selected': filter.rank ===  vRankType.hero }" @click="onSelectRank(vRankType.hero)">
                    {{$t('rankType.hero')}}</span>
            </div>


            <div class="rank-view-select-box" v-if="!onlyHardcore">
                <span class="btn btn-select-rank-type" v-bind:class="{'rank-selected': filter.hardcore === 'true'}" @click="onSelectLevel('true')">
                    {{$t('level.hardcore')}}</span> |
                <span class="btn btn-select-rank-type" v-bind:class="{'rank-selected': filter.hardcore === 'false'}" @click="onSelectLevel('false')">
                    {{$t('level.softcore')}}</span>
            </div>

             <div class="rank-view-select-box"> 
                <span class="btn btn-select-rank-type" v-bind:class="{'rank-selected': filter.seasonal === 'false' }" v-if="filter.rank === vRankType.player" @click="onSeasonal('false')">
                    {{ $t( 'not.seasonal' ) }} </span> |
                <span class="btn btn-select-rank-type" v-bind:class="{'rank-selected': filter.seasonal == 'true' }" @click="onSeasonal('true')">
                    {{ $t( 'seasonal' ) }}</span>
            </div>

            
            
        </div>
        <div style="display: flex; direction: column; flex-wrap: wrap;" v-if="filter.rank === vRankType.hero"> 
            <div class="rank-view-select-box">
                 <span class="btn btn-select-rank-type" v-for="(item, index ) in heroViews" :key="item.value" v-bind:class="{'rank-selected': filter.hero === item.value }" @click="onSelectHero(item.value)">                    
                      {{ $t( item.label ) }} <span  v-bind:class="{'rank-selected-2': filter.hero === item.value }" v-if="index !== heroViews.length-1" > | </span> </span>                  
            </div>

        </div>


        <div style="display: flex; direction: column; flex-wrap: wrap;" v-if="filter.seasonal === 'true'"> 

                <span class="btn btn-select-rank-type" v-for="(item, index) in seasonsList" :key="item" v-bind:class="{'rank-selected': filter.season === item }" @click="onSelectSeason(item)">                    
                      {{ item }} <span v-bind:class="{'rank-selected-2': filter.season === item }" v-if="index !== seasonsList.length-1" > | </span> </span>        
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getSeasonList, getRankListFilter } from '@/storeGetters';
import { setRankListFilter } from '@/storeMutations';
import { RankModelRequest } from '@/model/RankModelRequest';
import { loadRankList } from '@/storeActions';
import { ONLY_HARD } from '@/constant/AppConfig';
import { HeroType } from '@/model/HeroType';
import { OrderByType } from '@/model/OrderByType';
import { RankType } from '@/model/RankType';

interface SelectItem<T> {
    value: T;
    label: string;
}

@Component
export default class RankFilter extends Vue {

    private vRankType = RankType;
    private vHeroType = HeroType;
    private vOrderByType = OrderByType;
    private onlyHardcore = ONLY_HARD;

    private heroViews: Array<SelectItem<HeroType>> = [
        
        { value: HeroType.barbarian, label: 'heroType.barbarian' },
        { value: HeroType.deamonHunter, label: 'heroType.deamonHunter' },
        { value: HeroType.monk, label: 'heroType.monk' },
        { value: HeroType.witchDoctor, label: 'heroType.witchDoctor' },
        { value: HeroType.wizard, label: 'heroType.wizard' },
        { value: HeroType.crusader, label: 'heroType.crusader' },
        { value: HeroType.necromancer, label: 'heroType.necromancer' },
        { value: HeroType.teamTwo, label: 'heroType.teamTwo' },
        { value: HeroType.teamThree, label: 'heroType.teamThree' },
        { value: HeroType.teamFour, label: 'heroType.teamFour' },

    ];



    private get filter(): RankModelRequest {
        return this.$store.getters[getRankListFilter] as RankModelRequest;
    }

    private set filter(value: RankModelRequest) {
        this.$store.commit(setRankListFilter, value);
    }

    private get seasonsList(): number[] {
        return this.$store.getters[getSeasonList] as number[];
    }

    private onSelectRank(rank: RankType): void {
        this.filter.rank = rank;

        if (this.filter.rank == RankType.hero) {
            this.filter.seasonal = 'true';
        }
        this.load();
    }

    private onSelectLevel(value: string): void {
        this.filter.hardcore = value;
        this.load();
    }

    private onSeasonal(value: string): void {

        if ( value === 'true' && this.filter.season === 0) {
            this.filter.season = this.seasonsList[0];
        }

        this.filter.seasonal = value;
        this.load();
    }

    private onSelectSeason(value: number): void {
        this.filter.season = value;
        this.load();
    }

    private onSelectHero(value: HeroType): void {
        this.filter.hero = value;

        this.load();
    }

    private load(): void {

       this.$store.dispatch(loadRankList);
    }
}
</script>

