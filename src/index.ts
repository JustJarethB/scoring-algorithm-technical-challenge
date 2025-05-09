import { api, Job, Member } from "./api"
import { scoreJob } from "./scoreJob"
import * as Logger from "./utils/logger"

const MINIMUM_MATCH_SCORE = 1

// we'll keep it in a function for scope and async-await but call below since I'll just run as CLI
const main = async () => {
    Logger.log('Running recommendation algorithm')
    const [members, jobs] = await Promise.all([await api.getMembers(), await api.getJobs()])
    const results = members.map(generateRecommendations(jobs))
    Logger.log('Completed recommendation algorithm')
    results.forEach(printMemberRecommendation)
}
// All these functions could be somewhere else but it would probably take longer to decide where to put it than I've already spent on this
const generateRecommendations = (jobs: Job[]) => (member: Member) => {
    const jobScores = jobs.map(scoreJob(member)).sort(orderByScore).filter((job) => job.score >= MINIMUM_MATCH_SCORE)
    const recommendations = jobScores.slice(0, 3)
    return { recommendations, member }
}

const printMemberRecommendation = ({ member, recommendations }: { member: Member, recommendations: { job: Job, score: number }[] }) => {
    Logger.debug(member.bio)
    if (recommendations.length === 0) return Logger.log(`No recommendations for ${member.name}`)
    Logger.log(`Recommendations for ${member.name}:`)
    recommendations.forEach(({ job, score }) => {
        Logger.log(`- [${score}] ${job.title} (${job.location})`)
    })
}

const orderByScore = (a: { score: number }, b: { score: number }) => {
    if (a.score > b.score) return -1
    if (a.score < b.score) return 1
    return 0
}
main()
