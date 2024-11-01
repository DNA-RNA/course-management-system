import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ],
});

// Middleware fonksiyonu
export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Request: ${req.method} ${req.url}`);
    next(); // Bir sonraki middleware'e geçiş yap
};

export { logger }; // Logger'ı ayrıca dışa aktarabilirsiniz.
