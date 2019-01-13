import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { SeasonConfigModel } from '@/model/SeasonConfigModel';
import { RankType } from '@/model/RankType';
import { GetSeasonConfigRequest } from '@/model/GetSeasonConfigRequest';

class CommonApi {
    private api: AxiosInstance;
    constructor() {
        this.api = Axios.create({
        });
    }

    public getSeasonalConfig(rankType: RankType): Promise<SeasonConfigModel> {

        const req: GetSeasonConfigRequest = new GetSeasonConfigRequest(rankType);

        const promise: Promise<SeasonConfigModel> = new Promise(
            (resolve, reject) => {
                this.api.post<SeasonConfigModel>('/api/rank/seasonalConfig', req).then(
                    ( result ) => {
                        if (result.status === 200) {
                            resolve(result.data);
                        } else {
                            reject(`Query seasonalConfig failed with code: ${result.status}`);
                        }
                    },
                );
            },
        );

        return promise;
    }
}

export default new CommonApi();
