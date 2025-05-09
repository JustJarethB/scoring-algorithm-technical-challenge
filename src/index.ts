import { api, Job, Member } from "./api"
import * as Logger from "./utils/logger"

const MINIMUM_MATCH_SCORE = 2

// we'll keep it in a function for scope and async-await but call below since I'll just run as CLI
const main = async () => {
    Logger.log('Running recommendation algorithm')
    const [members, jobs] = await Promise.all([await api.getMembers(), await api.getJobs()])
    const results = members.map((member) => {
        const recommendations = jobs.map(scoreJob(member)).filter(({ score }) => score >= MINIMUM_MATCH_SCORE).sort(orderByScore)
        return { recommendations, member }
    })
    Logger.log('Completed recommendation algorithm')
    results.forEach(printMemberRecommendation)
}

const printMemberRecommendation = ({ member, recommendations }: { member: Member, recommendations: { job: Job, score: number }[] }) => {
    Logger.debug(member.bio)
    if (recommendations.length === 0) return Logger.log(`No recommendations for ${member.name}`)
    Logger.log(`Recommendations for ${member.name}:`)
    recommendations.forEach(({ job, score }) => {
        Logger.log(`- [${score}] ${job.title} (${job.location})`)
    })
}

const scoreJob = (member: Member) => (job: Job) => {
    const { title, location } = job
    let score = 0
    const locationMatches = member.bio.match(new RegExp(location, 'gi'))
    if (locationMatches) {
        score += locationMatches.length
    }
    const titleMatches = member.bio.match(new RegExp(title.split(' ').join("|"), 'gi'))
    if (titleMatches) {
        score += titleMatches.length
    }
    return { score, job }
}

const orderByScore = (a: { score: number }, b: { score: number }) => {
    if (a.score > b.score) return -1
    if (a.score < b.score) return 1
    return 0
}
main()
