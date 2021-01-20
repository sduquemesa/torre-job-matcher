import { IJobData } from ".";

export default interface ISearchData {
    id: string,
    job_data?: IJobData
}

export interface ISearchQueryParams {
    offset: any,
    size: any,
    aggregate: any,
    text_query: any,
    lang: any
}

export interface ITorreSearchQueryParams {
    offset: number,
    size: number,
    aggregate: boolean,
    lang: any
}

