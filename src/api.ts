import * as Logger from './utils/logger'

export type Member = {
    name: string,
    bio: string
}
export type Job = {
    title: string,
    location: string
}

// I'd prefer to assert this input types, probably with zod or similar
const baseUrl = 'https://bn-hiring-challenge.fly.dev'
export const api = {
    getMembers: async () => {
        Logger.debug('Fetching members')
        const response = await fetch(`${baseUrl}/members.json`);
        Logger.debug('Fetched members')
        return await response.json() as Member[];
    },
    getJobs: async () => {
        Logger.debug('Fetching jobs')
        const response = await fetch(`${baseUrl}/jobs.json`);
        Logger.debug('Fetched jobs')
        return await response.json() as Job[];
    }
};
