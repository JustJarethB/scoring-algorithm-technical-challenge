const c = { NC: "\x1b[0m", LIGHT_BLUE: "\x1b[0;36m" }
export const log = console.log
export const error = console.error
export const debug = (...args: Parameters<typeof console.debug>) => console.debug(`${c.LIGHT_BLUE}[DEBUG]${c.NC}`, ...args)