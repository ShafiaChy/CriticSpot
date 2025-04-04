import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

//  Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['https://critic-spot-client.vercel.app', 'http://localhost:5173'], // Allowed frontend origins
  credentials: true, // Allow cookies and authentication headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Explicitly allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Allowed headers
}));

// application related api
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);


app.get('/', (req: Request, res: Response) => {
  res.send('The product review system is running');
});

export default app;
