import { Router } from "express";

export const routerLoggerTest = Router()

//("/api")
routerLoggerTest.get('/loggertest', (req, res) => {
    req.logger.debug('Debug message');
    req.logger.http('HTTP message');
    req.logger.warning('Warning message');
    req.logger.error('Error message');
    req.logger.fatal('Fatal message');
    res.send('Mensajes enviados');
  });