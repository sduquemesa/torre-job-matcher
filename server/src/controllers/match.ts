import axios, { AxiosResponse } from 'axios';
import { IMatchQueryParams } from '../types'

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
        const search_results: AxiosResponse = await axios({
            method: 'post',
            url: `http://localhost:5000/match`,
            headers: {'Content-Type': 'application/json'},
            data: {
                "skill/role": {
                    "text": Worker.search_text,
                    "experience": "potential-to-develop"
                }
            }
        });
        return search_results.data;
    }

    /**
     * getMatchData: Sends all user and job data to the
     * ML python server and gets back tha analysed data
     * 
     * @return an object with the analysed data
     */
    public async getMatchData(): Promise<IMatchData> {
        console.log('Match.Worker.getMatchData()');
    }


} /* End Class */