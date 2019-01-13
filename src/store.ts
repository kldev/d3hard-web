import Vue from 'vue';
import Vuex, { ActionTree, ActionContext, MutationTree, GetterTree } from 'vuex';

Vue.use(Vuex);

import { RankModel } from '@/model/RankModel';
import { RankModelRequest} from '@/model/RankModelRequest';

import rankApi from '@/api/RankApi';
import commonApi from '@/api/CommonApi';

import * as actions from './storeActions';
import * as mutations from './storeMutations';
import * as getters from './storeGetters';
import { SeasonConfigModel } from './model/SeasonConfigModel';
import { RankType } from './model/RankType';

interface IAppState {
  rankList: RankModel[];
  rankListFilter: RankModelRequest;
  showAdd: boolean;
  seasonConfig: SeasonConfigModel;
  seasonList: number[];
  seasonListHero: number[];
  busy: boolean;
}

const AppState: IAppState = {
  rankList: [],
  rankListFilter: new RankModelRequest(),
  showAdd: false,
  seasonConfig: new SeasonConfigModel(),

  seasonList: [],
  seasonListHero: [],
  busy: false,
};

interface IAppActions extends ActionTree<IAppState,  {}> {
  [actions.loadRankList](context: ActionContext<IAppState, {}>): void;
  [actions.getSeasonalConfig](context: ActionContext<IAppState, {}>): void;
  [actions.createOrUpdatePlayer](context: ActionContext<IAppState, {}>): void;
}

const AppActions: IAppActions = {
  [actions.loadRankList]({commit, state}): void {

    if (state.rankListFilter.season === 0 && state.rankListFilter.seasonal === 'true') { return; }

    rankApi.playerRank(state.rankListFilter)
      .then( (result ) => {
        commit(mutations.setRankList, result);
      });
  },

  [actions.getSeasonalConfig]({commit, state, dispatch}): void {

    commonApi.getSeasonalConfig(RankType.player).then(
      (result) => {
        commit(mutations.setSeasonalConfig, result);

        const { rankListFilter, seasonList } = state;
        rankListFilter.season = seasonList[0];
        commit(mutations.setRankListFilter,  rankListFilter);

        dispatch(actions.loadRankList);
      });
  },

  [actions.createOrUpdatePlayer]( { commit, state }): void {

    const { btag } = state.rankListFilter;
    if ( btag === '' || btag.indexOf('#') === -1) {
        return;
     }

    commit(mutations.setBusy, true);

    rankApi.rankCreate(btag).then(() => {
       rankApi.upadtePosition().then( () => {
          commit(mutations.setBusy, false);
          commit(mutations.setShowAdd, false);
       });
     });
  },
};

interface IAppMutations extends MutationTree<IAppState> {
  [mutations.setRankList](state: IAppState, payload: RankModel[]): void;
  [mutations.setRankListFilter](state: IAppState, payload: RankModelRequest): void;

  [mutations.setShowAdd](state: IAppState, payload: boolean): void;
  [mutations.setSeasonalConfig](state: IAppState, payload: SeasonConfigModel): void;
  [mutations.setBusy](state: IAppState, payload: boolean): void;
}

const AppMutations: IAppMutations = {
  [mutations.setRankList](state, payload): void {
    state.rankList = payload;
  },
  [mutations.setRankListFilter](state, payload): void {
    state.rankListFilter = payload;
  },
  [mutations.setShowAdd](state, payload): void {
    if (!payload) { state.busy = false; }

    state.showAdd = payload;
  },
  [mutations.setBusy](state, payload): void {
    state.busy = payload;
  },

  [mutations.setSeasonalConfig](state, payload): void {
    state.seasonConfig = payload;

    const seasons: number[] = [];
    for (let i = payload.max; i >= payload.min; i--) {
      seasons.push(i);
    }

    const seasonsHero: number[] = [];

    for (let i = payload.max; i >= 1; i--) {
      seasonsHero.push(i);
    }

    state.seasonList = seasons;
    state.seasonListHero = seasonsHero;
  },
};

interface IAppGetters extends GetterTree<IAppState, {}> {
  [getters.getRankList](state: IAppState): RankModel[];
  [getters.getRankListFilter](state: IAppState): RankModelRequest;
  [getters.getShowAdd](state: IAppState): boolean;

  [getters.getSeasonalConfig](state: IAppState): SeasonConfigModel;
  [getters.getSeasonList](state: IAppState): number[];
  [getters.getSeasonListHero](state: IAppState): number[];
  [getters.getBusy](state: IAppState): boolean;
}

const AppGetters: IAppGetters = {
  [getters.getRankList](state): RankModel[] {
    return state.rankList;
  },
  [getters.getRankListFilter](state): RankModelRequest {
    return state.rankListFilter;
  },

  [getters.getShowAdd](state): boolean {
    return state.showAdd;
  },

  [getters.getSeasonalConfig](state): SeasonConfigModel {
    return state.seasonConfig;
  },

  [getters.getSeasonList](state): number[] {
    return state.seasonList;
  },

  [getters.getSeasonListHero](state): number[] {
    return state.seasonListHero;
  },

  [getters.getBusy](state): boolean {
    return state.busy;
  },
};

export default new Vuex.Store<IAppState>({
  state: AppState,
  mutations: AppMutations,
  getters: AppGetters,
  actions: AppActions,
});
