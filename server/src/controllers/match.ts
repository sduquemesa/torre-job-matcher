import axios, { AxiosResponse } from 'axios';
import { SearchWorker, UsersWorker } from '.';
import { IMatchQueryParams, IMatchData, IUserData, ISearchData, ICollectedData } from '../types'

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
    private async postDataToAnalyse(data: ICollectedData) {
        const result: AxiosResponse = await axios({
            method: 'post',
            url: `http://localhost:5000/match`,
            headers: {'Content-Type': 'application/json'},
            data: data
        });
        return result.data;
    } /* End of postDataToAnalyse */

    /**
     * getMatchData: Sends all user and job data to the
     * ML python server and gets back tha analysed data
     * 
     * @return an object with the analysed data
     */
    public async getMatchData(): Promise<IMatchData> {
        console.log('Match.Worker.getMatchData()');

        // Get user data
        const userWorker: UsersWorker = new UsersWorker(Worker.query_params.username);
        const user_data: IUserData | undefined = await userWorker.getUserData();

        // Get job listings data
        const searchWorker: SearchWorker = new SearchWorker(Worker.query_params.search_params);
        const job_results: ISearchData[] | undefined = await searchWorker.getJobs();

        const collectedData: ICollectedData = {
            user_data: user_data,
            jobs_data: job_results
        }

        const data = await this.postDataToAnalyse(collectedData);
        return data;

    } /* End of getMatchData */


} /* End Class */