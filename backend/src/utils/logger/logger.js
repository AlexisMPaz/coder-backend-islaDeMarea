import winston from 'winston';

const logLevels = {
    levels: {
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal: 0
    },
    colors: {
        debug: 'blue',
        http: 'green',
        info: 'cyan',
        warning: 'yellow',
        error: 'red',
        fatal: 'magenta'
    }
};

winston.addColors(logLevels.colors);

export const logger = winston.createLogger({
    levels: logLevels.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
            format: () => new Date().toLocaleString()
        }),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            level: process.env.ENVIRONMENT === 'development' ? 'debug' : 'info',
        }),
        process.env.ENVIRONMENT === 'production' && new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.uncolorize()
        })
    ].filter(Boolean)
});

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} on ${req.url}`)
    next();
};