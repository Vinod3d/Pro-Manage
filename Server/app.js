import express from 'express'
import { APP_PORT, FRONTEND_URL, JWT_KEY, MONGO_URI  } from './config/Index.js';
import connectDB from './db/ConnectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import checkSessionRoute from './routes/checkSession.js'
import errorHandler from './middleware/errorHandlers.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
const PORT = APP_PORT;
app.use(express.json());
app.use(cookieParser(JWT_KEY));
app.use(express.urlencoded({extended: true}));

// Serve static assets from the React app's build folder on the backend, if needed
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
    res.send('app is running')
});

// ROUTES
app.use('/api/user', userRoutes)
app.use('/api', checkSessionRoute)
app.use(errorHandler)

// Fallback for unknown routes to serve React app
app.get('*', (req, res) => {
    if (!req.originalUrl.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    } else {
        res.status(404).json({ error: 'API route not found' });
    }
});

const start = async ()=>{
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
}
start();