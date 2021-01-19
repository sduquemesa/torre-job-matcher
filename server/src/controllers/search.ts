import axios, { AxiosResponse } from 'axios';
import { query } from 'express';
import { ISearchData, ISearchQueryParams } from '../types';

export default class Worker {

    /**
     * Constructor.
     */
    private static search_text: string;
    constructor(in_search_text: string) {
        console.log("Search.Worker.constructor", in_search_text);
        Worker.search_text = in_search_text;
    } /* End constructor(). */

    /**
     * getSearchResultsFromTorre: Perform search using Torre API
     */
    private async getSearchResultsFromTorre(query_params: ISearchQueryParams): Promise<AxiosResponse> {

        const search_results: AxiosResponse = await axios({
            method: 'post',
            url: `https://search.torre.co/opportunities/_search/?offset=${query_params.offset}&size=${query_params.size}`,
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

        const query_params: ISearchQueryParams = {
            offset: 0,
            size: 5000,
            aggregate: false
        }

        let search_results: any;
        do {
            search_results = await this.getSearchResultsFromTorre(query_params);
            job_results.push(
                ...search_results.results.map( (result: any): ISearchData => {
                    return {
                        id: result.id
                    }
                })
            );
            query_params.offset = query_params.offset + query_params.size;
            // console.log(`Search results ${job_results.length}/${search_results.total}`);

        } while (search_results.results.length !== 0);
        
        return job_results;

    } /* End of getJobs() */


} /* End of class */