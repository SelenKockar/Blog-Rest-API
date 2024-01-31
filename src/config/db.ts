import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }

}

export default connectDB;
