import axios, { AxiosResponse } from 'axios';
import { IMatchQueryParams, IMatchData } from '../types'

export default class Worker {

    /**
     * Constructor.
     */
    private static query_params: IMatchQueryParams;
    constructor(in_query_params: IMatchQueryParams) {
        console.log("Match.Worker.constructor", in_query_params);
        Worker.query_params = in_query_params;
    } /* End constructor(). */

    /**
     * postDataToAnalyse: Post user and jobs data to be analysed by the
     * ML server
     * 
     * @return raw analysed data from server
     */
    private async postDataToAnalyse() {
        const data_results: AxiosResponse = await axios({
            method: 'post',
            url: `http://localhost:5000/match`,
            headers: {'Content-Type': 'application/json'},
            data: Worker.query_params
        });
        return data_results.data;
    } /* End of postDataToAnalyse */

    /**
     * getMatchData: Sends all user and job data to the
     * ML python server and gets back tha analysed data
     * 
     * @return an object with the analysed data
     */
    public async getMatchData(): Promise<IMatchData> {
        console.log('Match.Worker.getMatchData()');
        const data = this.postDataToAnalyse();
        console.log(data);
        return data;

    } /* End of getMatchData */


} /* End Class */