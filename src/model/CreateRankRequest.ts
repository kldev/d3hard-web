import { BaseRequest } from './BaseRequest';

export class CreateRankRequest extends BaseRequest {
    constructor(public forumId: string = '',
                public bTag: string = '') {

                    super();
    }
}
