import { IJobData } from ".";

export default interface ISearchData {
    id: string,
    job_data?: IJobData
}

export interface ISearchQueryParams {
    offset: number,
    size: number,
    aggregate: false
}
