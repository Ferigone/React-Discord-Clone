import mongoose from 'mongoose';

class MongoDBConnector {
    private static instance: MongoDBConnector;
    private constructor() {}
    public static getInstance(): MongoDBConnector {
        if (!MongoDBConnector.instance) {
            MongoDBConnector.instance = new MongoDBConnector();
        }
        return MongoDBConnector.instance;
    }
    public async connect(url: string) {
       mongoose.set('strictQuery', true);
       const connection = await mongoose.connect(url);
       if(connection){
            console.log("Connected to MongoDB");
       }else{
            console.log("Failed to connect to MongoDB");
       }
    }
}

export default MongoDBConnector;