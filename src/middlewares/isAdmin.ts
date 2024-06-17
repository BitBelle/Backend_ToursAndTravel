import { Response, NextFunction } from 'express';
import { ExtendedRequest1 } from './index';

export function isAdmin(req: ExtendedRequest1, res: Response, next: NextFunction) {
    if (!req.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    next();
}
