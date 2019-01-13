import Axios, { AxiosInstance } from 'axios';
import { RankModelRequest } from '../model/RankModelRequest';
import { RankModel } from '@/model/RankModel';
import { CreateRankRequest } from '@/model/CreateRankRequest';
import { BaseRequest } from '@/model/BaseRequest';


class RankApi {
    private api: AxiosInstance;
    constructor() {
        this.api = Axios.create({
        });
    }

    public playerRank(req: RankModelRequest): Promise<RankModel[]> {

        const promise: Promise<RankModel[]> = new Promise(
            (resolve, reject) => {
                this.api.post<RankModel[]>('/api/rank/list', req)
                .then(
                    ( result ) => {
                        if (result.status === 200) {
                            resolve(result.data);
                        } else {
                            reject(`Query rank list failed with code: ${result.status}`);
                        }
                    },
                ).catch( (err) => {

                    reject(`Query rank list failed with code: ${err}`);

                });
            },
        );

        return promise;
    }

    public rankCreate(btag: string): Promise<any> {

        const promise: Promise<any> = new Promise(
            (resolve) => {

                const req = new CreateRankRequest('', btag);
                this.api.post<CreateRankRequest>('/api/rank/create', req)
                .then(
                    (result) => {
                        resolve(btag);
                    },
                ).catch( (err) => {

                    resolve(`Create rank list failed with code: ${err}`);

                });
            },
        );

        return promise;
    }

    public upadtePosition(): Promise<any> {

        const promise: Promise<any> = new Promise(
            (resolve) => {
                this.api.post('/api/rank/updatePosition', new BaseRequest())
                .then( () => {
                    resolve('');
                }).catch(() => {
                    resolve('');
                });
            });

        return promise;
    }
}

export default new RankApi();
