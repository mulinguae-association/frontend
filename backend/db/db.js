import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.SECRET_KEY;
async function connectToDatabase() {
  return mongoose.connect(`mongodb+srv://ascmulingua:${secretKey}@cluster0.aoz9ekg.mongodb.net/`, {
    useNewUrlParser: true,
  });
}

export { connectToDatabase };
