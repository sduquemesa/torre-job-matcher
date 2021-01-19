import axios, { AxiosResponse } from 'axios';
import { IJobData, IUserData } from '../types';

export default class Worker {

    /**
     * Constructor.
     */
    private static job_id: string;
    constructor(in_job_id: string) {
        console.log("Jobs.Worker.constructor", in_job_id);
        Worker.job_id = in_job_id;
    } /* End constructor(). */

    /**
     * getJobFromTorre: Get job info from Torre API
     *
     * @return Object with job info from JSON response.
     */
    private async getJobFromTorre(): Promise<AxiosResponse> {
        const job_data: AxiosResponse = await axios.get(`https://torre.co/api/opportunities/${Worker.job_id}`);
        return job_data.data
    } /* End of getJobFromTorre() */

    /**
     * getJobData: Unpacks the interesting job data from Torre response.
     *
     * @return An objects containing job data.
     */
    public async getJobData(): Promise<IJobData | undefined> {
        console.log('Jobs.Worker.getJobData()');
        const torre_job_data: any = await this.getJobFromTorre();
        let job_data: IJobData | undefined;

        // Check if person was found
        if (torre_job_data.details !== undefined) {
            job_data = {
                objective: torre_job_data.objective,
                details: torre_job_data.details.map( (detail_value: any) : string[] => {return detail_value.content} ),
                strengths: torre_job_data.strengths.map( (strength_value: any) : string[] => {return strength_value.name} ),
                job_id: Worker.job_id
            };
        } else {
            job_data = undefined;
        }

        return job_data;

    } /* End of getJobData() */


} /* End of class */