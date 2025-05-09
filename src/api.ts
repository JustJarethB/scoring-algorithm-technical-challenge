import * as Logger from './utils/logger'

export type Member = {
    name: string,
    bio: string
}
export type Job = {
    title: string,
    location: string
}

// I'd prefer to assert this properly (maybe zod or similar) but for now some quick checks and an `as` will do
const baseUrl = 'https://bn-hiring-challenge.fly.dev'
export const api = {
    getMembers: async () => {
        Logger.debug('Fetching members')
        const response = await fetch(`${baseUrl}/members.json`);
        const json = await response.json();
        if (!Array.isArray(json)) throw new Error('Invalid response from API, expected Array')
        if (json.length === 0) throw new Error('No members found in API')
        if (json.some((member: Member) => !member.name || !member.bio)) throw new Error('Invalid member object in API response')
        Logger.debug('Fetched members')
        return json as Member[];
    },
    getJobs: async () => {
        Logger.debug('Fetching jobs')
        const response = await fetch(`${baseUrl}/jobs.json`);
        const json = await response.json();
        if (!Array.isArray(json)) throw new Error('Invalid response from API, expected Array')
        if (json.length === 0) throw new Error('No jobs found in API')
        if (json.some((job: Job) => !job.title || !job.location)) throw new Error('Invalid job object in API response')
        Logger.debug('Fetched jobs')
        return json as Job[];
    }
};
