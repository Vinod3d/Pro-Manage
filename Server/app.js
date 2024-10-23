import express from 'express'
import { APP_PORT, JWT_KEY, MONGO_URI } from './config/Index.js';
import connectDB from './db/ConnectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import checkSessionRoute from './routes/checkSession.js'
import errorHandler from './middleware/errorHandlers.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
const PORT = APP_PORT;
app.use(express.json());
app.use(cookieParser(JWT_KEY));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('app is running')
});

// ROUTES
app.use('/api/user', userRoutes)
app.use('/api', checkSessionRoute)
app.use(errorHandler)

const start = async ()=>{
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
}
start();