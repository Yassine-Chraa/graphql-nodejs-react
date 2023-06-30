import mongoose from "mongoose"

export const connect =async () => {
    try {
        mongoose.set('strictQuery',true)
        const conn = mongoose.connect(process.env.CONNECTION_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        
    } catch (err) {
        console.log(`${err.message}`)
        process.exit(1)
    }
}