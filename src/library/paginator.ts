import { Request, Response } from 'express';
import { config } from '../config/Config';

// use and destruct {limit,skip} from paginator
export const paginator = (req: Request, res: Response) => {
    const { page, size } = req.query;
    const pageNumber = page ? Number(page) : config.DEFAULT_PAGE;
    const pageSize = size && Number(size) <= config.MAX_FETCH_SIZE ? Number(size) : config.DEFAULT_FETCH_SIZE;
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;
    return { limit, skip };
}