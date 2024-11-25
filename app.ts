import 'dotenv/config'
import express, { Request, Response } from "express"

const app = express(); 
import configureMiddleware from './config'; 

configureMiddleware(app);

app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
    res.send('Connection is live');
});

import indexRoutes from "./routes/index.routes"; 
import registerErrorHandlers from './error-handline';
import authRoutes from './routes/auth.routes';
app.use('/api', indexRoutes);
app.use('/auth', authRoutes)

registerErrorHandlers(app);

export default app;