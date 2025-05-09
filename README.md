# bn-hiring-challenge
For each member, please print their name and their recommended job(s)

## Run Steps
I used `pnpm` but you are welcome to substitute for npm/yarn
```
pnpm i --frozen-lockfile && pnpm start
```

## Thought process:
- TS > JS. It'll help me run faster
- Looking at the end points, I think I want to regex search bios for words in job name and location. 
- Maybe I can give a score for amount of matches. We can then dial up/down the number for more refined matching
- I'm just going to use tsx and a console output for simplicity.
- I don't want to bother with frameworks or packages, I'll try and keep it all node and native (I will install types though)
- I'm going to start by writing it all in one file, and I'll try and break it down into more logical chunks once I'm happier with my flow and process
- I've just fetched data and I have seen "I'm a software developer currently in Edinburgh but looking to relocate to London" and "I'm looking for a job in marketing outside of London". My simple regex won't pick up on the intent here but I'm not about to interface with a LLM for this tech task. This can be a module that gets improved over time
- It's been about 90 minutes, it isn't perfect for sure, but I'm getting a semi-sensible score and report. I've listed a little more than you asked for but that's partly for my debugging, but it might help you understand the output a little better too.