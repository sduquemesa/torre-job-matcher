export default interface IJobData {
    objective: string,
    details: string[],
    strengths: string[],
    job_id?: string,
    organizations?: { name: string, picture: string }[],
    cover_img?: string
}