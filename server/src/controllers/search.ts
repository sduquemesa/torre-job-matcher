import axios, { AxiosResponse } from 'axios';
import { ISearchData, ISearchQueryParams, ITorreSearchQueryParams, IJobData } from '../types';
import { JobsWorker } from './';

export default class Worker {

    /**
     * Constructor.
     */
    private static search_text: string;
    private static query_params: ISearchQueryParams;
    constructor(in_query_params: ISearchQueryParams) {
        console.log("Search.Worker.constructor", in_query_params);
        Worker.search_text = in_query_params.text_query;
        Worker.query_params = in_query_params;
    } /* End constructor(). */

    /**
     * getSearchResultsFromTorre: Perform search using Torre API
     * 
     * @return data from search results
     */
    private async getSearchResultsFromTorre(query_params: ITorreSearchQueryParams): Promise<AxiosResponse> {

        const search_results: AxiosResponse = await axios({
            method: 'post',
            url: `https://search.torre.co/opportunities/_search/?offset=${query_params.offset}&size=${query_params.size}&lang=${query_params.lang}`,
            headers: {},
            data: {
                "skill/role": {
                    "text": Worker.search_text,
                    "experience": "potential-to-develop"
                }
            }
        });
        return search_results.data;
    } /* End of getSearchResultsFromTorre() */

    /**
     * getJobs: Get ALL job listings from Torre API
     * This method uses pagination to get ids from all listings.
     *
     * @return A list of objects with jobs info from JSON response.
     */
    public async getJobs(): Promise<ISearchData[]> {

        console.log('Search.Worker.getJobs()');

        const job_results: ISearchData[] = [];

        const torre_query_params: ITorreSearchQueryParams = {
            offset: (Worker.query_params.offset === undefined) ? 0 : Worker.query_params.offset,
            size: (Worker.query_params.size === undefined) ? 20 : Worker.query_params.size,
            aggregate: false,
            lang: (Worker.query_params.lang === undefined) ? 'en' : Worker.query_params.lang
        }

        let search_results: any;
        search_results = await this.getSearchResultsFromTorre(torre_query_params);

        for await (const result of search_results.results) {
            const jobsWorker: JobsWorker = new JobsWorker(result.id);
            const job_data: IJobData | undefined = await jobsWorker.getJobData();
            if (job_data !== undefined) {
                job_results.push({
                    id: result.id,
                    job_data: job_data
                })
            }
        }
 
        console.log(`Search results: ${job_results.length}/${search_results.total}`);


        return job_results;

    } /* End of getJobs() */


} /* End of class */