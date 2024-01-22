const rateLimit = require('express-rate-limit');


const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Too many login attemps from this Ip Please try again after  60 second pause',
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = loginLimiter;