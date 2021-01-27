import axios, { AxiosResponse } from 'axios';
import { IUserData, ISearchQueryParams, ITorreSearchQueryParams } from '../types';

export default class Worker {

    /**
     * Constructor.
     */
    private static search_text: string;
    private static query_params: ISearchQueryParams;
    constructor(in_query_params: ISearchQueryParams) {
        console.log("UserSearch.Worker.constructor", in_query_params);
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
            url: `https://search.torre.co/people/_search/?offset=${query_params.offset}&size=${query_params.size}&lang=${query_params.lang}`,
            headers: {},
            data: { name: { term:  Worker.search_text } }
            
        });
        return search_results.data;
    } /* End of getSearchResultsFromTorre() */

    /**
     * getUserSuggest: Get user list from Torre API
     *
     * @return A list of objects with jobs info from JSON response.
     */
    public async getUserSuggest(): Promise<IUserData[]> {

        console.log('Search.Worker.getUserSuggest()');

        const torre_query_params: ITorreSearchQueryParams = {
            offset: (Worker.query_params.offset === undefined) ? 0 : Worker.query_params.offset,
            size: (Worker.query_params.size === undefined) ? 20 : Worker.query_params.size,
            aggregate: false,
            lang: (Worker.query_params.lang === undefined) ? 'en' : Worker.query_params.lang
        }

        let search_results: any;
        search_results = await this.getSearchResultsFromTorre(torre_query_params);

        const parsed_results: IUserData[] = search_results.results
            .filter((result:any): boolean => result.verified)
            .map((result: any): IUserData => {
            return {
                name: result.name,
                username: result.username,
                id: result.id,
                location: result.locationName,
                picture: result.picture,
                professionalHeadline: result.professionalHeadline,
            }
        })

        return parsed_results;

    } /* End of getJobs() */


} /* End of class */