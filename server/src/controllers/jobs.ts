import axios, { AxiosResponse } from 'axios';
import { IJobData } from '../types';

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
        let job_data: AxiosResponse;
        job_data = await axios.get(
            `https://torre.co/api/opportunities/${Worker.job_id}`, 
            {validateStatus: function (status) {
                return true;
            }}
        );
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
                details: torre_job_data.details.filter( (detail_value: any) =>  detail_value.code === 'responsibilities' || detail_value.code === 'requirements' || detail_value.code === 'career-path').map( (detail_value: any) : string[] => {return detail_value.content} ),
                strengths: torre_job_data.strengths.map( (strength_value: any) : string[] => {return strength_value.name} ),
                job_id: Worker.job_id,
                organizations: torre_job_data.organizations.map((organization: any) => { return { name: organization.name, picture: organization.picture } }),
                cover_img: torre_job_data.attachments.filter((attachment: any) => (attachment.resource === 'cover'))[0].address
            };
        } else {
            job_data = undefined;
        }

        return job_data;

    } /* End of getJobData() */


} /* End of class */