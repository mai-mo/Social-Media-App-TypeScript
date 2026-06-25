import express from 'express';
import { authRouter, userRouter } from './modules';
import { globalErrorHandler } from './middleware';
import { PORT } from './config/config';
import connectDB from './DB/connection.db';
import { redisService } from './common/services';
import cors from 'cors';

const bootstrap = async (): Promise<void> => {

    const app: express.Express = express()

    // json عشان يحول الكلام اللي اليوزر هيدخله ل 
    app.use(express.json(), cors())

    app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        return res.status(200).json({ message: "Landing Page" })
    })
    
    // application-routing
    app.use('/auth', authRouter)
    app.use('/user', userRouter)

    app.get('/*dummy', (req: express.Request, res: express.Response, next: express.NextFunction ) => {
        res.status(404).json({message: "Invalid Application Routing"})
    })
    
    // application-error
    app.use(globalErrorHandler)

    await connectDB()
    await redisService.connect()
    app.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}`);

    })
    console.log("Application bootstrapped successfully")

}

export default bootstrap

