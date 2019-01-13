import { BaseRequest } from './BaseRequest';
import { RankType } from './RankType';

export class GetSeasonConfigRequest extends BaseRequest {
    constructor(public rankType: RankType = RankType.hero) {
        super();
    }
}
