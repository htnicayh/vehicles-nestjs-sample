const cookieSession = require('cookie-session')

const SessionMiddleware = cookieSession({
    keys: ['znoktob']
})

export default SessionMiddleware