import mongoose from "mongoose"

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo-app'

const withDB = async (serverListener?: () => void): Promise<void> => {
    try {
      const x = await mongoose.connect(MONGO_URI)
      console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
      if (typeof serverListener === 'function') {
        serverListener()
      }
    } catch (error) {
      console.error('Error connecting to mongo: ', error)
    }
  }
  
  export default withDB;