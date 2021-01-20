import { ISearchQueryParams } from "./ISearch";

export default interface IMatchQueryParams {
    username: any,
    search_params: ISearchQueryParams
}

export interface IMatchData {
    [key: string]: any;
}