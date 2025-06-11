import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = "mongodb+srv://hossainieofficial:2qu3xhMA6ww5BLX8@cluster1.t1rsu.mongodb.net/Deploy_test?retryWrites=true&w=majority&appName=Cluster1";


export const connectDB = ()=>{
	try{
		const connect = mongoose.connect(MONGO_URI);
		console.log("Mongo Database connected " );
	}
	catch(error){
		console.error("Error : ", error);
		process.exit(1);
	}
}
