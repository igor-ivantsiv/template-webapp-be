import logger from 'morgan';
import cors from 'cors';
import express from 'express';

const FRONTEND_URL = process.env.ORIGIN || 'http://localhost:5173';

// Middleware configuration
const configureMiddleware = (app: express.Application): void => {
  // Because this is a server that will accept requests from outside and it will be hosted on a server with a `proxy`, 
  // express needs to know that it should trust that setting.
  // Services like Heroku use something called a proxy and you need to add this to your server
  app.set('trust proxy', 1);

  // Controls a very specific header to pass headers from the frontend
  app.use(cors({
    origin: [FRONTEND_URL] // Pass the URL in array notation
  }));

  // In development environment the app logs each request to the console
  app.use(logger('dev'));
};

export default configureMiddleware; // Export the function to be used in your main file