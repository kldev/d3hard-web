import { BaseRequest } from './BaseRequest';
import { HeroType } from './HeroType';
import { RankType } from './RankType';
import { OrderByType } from './OrderByType';

export class RankModelRequest extends BaseRequest {

    constructor(public offset: number = 0,
                public btag: string = '',
                public orderBy: OrderByType = OrderByType.rank,
                public direction: string = 'desc',
                public rank: RankType = RankType.player,
                public hero: HeroType = HeroType.barbarian,
                public seasonal: string = 'true',
                public hardcore: string = 'true',
                public season: number = 0,
                ) {
        super();
    }
}
