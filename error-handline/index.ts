import { Request, Response, NextFunction } from 'express';
import Express from 'express';

const handle404 = (req: Request, res: Response): void => {
  res.status(404).json({
    message:
      'This route does not exist, you should probably look at your URL or what your backend is expecting',
  });
};

const handleErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500).json({
      message: 'Internal server error. Check the server console',
    });
  }
};

const registerErrorHandlers = (app: Express.Application): void => {
  app.use(handle404); 
  app.use(handleErrors); 
};

export default registerErrorHandlers;  