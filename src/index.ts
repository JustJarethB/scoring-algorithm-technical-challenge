// we'll keep it in a function for scope and async-await but call below since I'll just run as CLI
type Member = {
    name: string,
    bio: string
}
type Job = {
    title: string,
    location: string
}
const Logger = {
    log: console.log
}
const MINIMUM_MATCH_SCORE = 1
const main = async () => {
    Logger.log('Running recommendation algorithm')
    // I'd prefer to assert this input types, probably with zod or similar
    const memebers: Member[] = await (await fetch('https://bn-hiring-challenge.fly.dev/members.json')).json()
    const jobs: Job[] = await ((await fetch('https://bn-hiring-challenge.fly.dev/jobs.json')).json())
    const results = memebers.map((member) => {
        const recommendations = jobs.map((job) => {
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
        }).filter(({ score }) => score >= MINIMUM_MATCH_SCORE)
        return { recommendations, member }
    })
    Logger.log('Recommendations:', JSON.stringify(results, null, 2))
}
main()
