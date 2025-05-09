import * as Logger from "./utils/logger";
import { Member, Job } from "./api";

export type ScoredJob = {
    score: number;
    job: Job;
}
// This is a bit gross but you can see what I'm getting at
const LUT = [
    ['design', 'designer', 'ux', 'ui', 'product'],
    ['engineering', 'engineer', 'dev', 'developer', 'software', 'fullstack', 'backend', 'frontend'],
    ['marketing', 'growth', 'sales'],
    ['data', 'analyst'],
    ['hr', 'recruiter'],
    ['finance', 'accounting'],
    ['legal', 'law', 'compliance'],
]
const useLUT = (word: string) => LUT.find((group) => (new RegExp(group.join("|"), 'gi')).test(word)) ?? [word]


export const scoreJob = (member: Member) => {
    const score = (...words: string[]): number => member.bio.match(new RegExp(words.flatMap(useLUT).join('|'), 'gi'))?.length ?? 0;
    const scoreLocation = (location: string): number => score(location)
    const scoreTitle = (title: string): number => score(...title.split(' '))
    return (job: Job): ScoredJob => {
        const { title, location } = job;
        const score = scoreLocation(location) + scoreTitle(title);
        return { score, job };
    };
};
