import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import dotenv from 'dotenv'; // Move dotenv import to the top
dotenv.config(); // Load environment variables from .env
import { connectToDatabase } from './db/db.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Mount the routes
app.use('/uploads', express.static('uploads'));
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
