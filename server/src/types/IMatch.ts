import { ISearchQueryParams, IUserData, ISearchData } from "./";

export default interface IMatchQueryParams {
    username: any,
    search_params: ISearchQueryParams
}

export interface IMatchData {
    [key: string]: any;
}

export interface ICollectedData {
    user_data: IUserData | undefined,
    jobs_data: ISearchData[] | undefined
}