import express from 'express';
import { authRouter, realTimeGateway, schema, userRouter } from './modules';
import { globalErrorHandler } from './middleware';
import { PORT } from './config/config';
import connectDB from './DB/connection.db';
import { redisService, s3Service, TokenService } from './common/services';
import cors from 'cors';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { successResponse } from './common/response';
import { postRouter } from './modules/post/post.service';
import { createHandler } from 'graphql-http/lib/use/express';
import { authentication } from './middleware/authentication.middleware';
import { Server } from 'socket.io';
import { Server as HttpServerType } from 'node:http';
import { IAuthSocket } from './common/types/express.types';

const s3WriteStream = promisify(pipeline)

const bootstrap = async (): Promise<void> => {

    const app: express.Express = express()

    app.use(express.json(), cors())
    app.all('/graphql', authentication(), createHandler({ schema: schema, context: (req) => ({ user: req.raw.user, decoded: req.raw.decoded }) }))
    app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => {
        return res.status(200).json({ message: "Landing Page" })
    })

    // application-routing
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/post', postRouter)

    app.get("/Uploads/*path", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const { download, fileName } = req.query as { download: string, fileName: string }
        const { path } = req.params as { path: string[] }
        const Key = path.join('/')
        const { Body, ContentType } = await s3Service.getAsset({ Key })
        console.log({ Body, ContentType });
        res.setHeader(
            'Content-Type',
            ContentType || 'application/octet-stream'
        );
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        if (download === 'true') {
            res.setHeader("Content-Disposition", `attachment; filename="${fileName || Key.split("/").pop()}"`); // only apply it for download
        }
        return await s3WriteStream(Body as NodeJS.ReadableStream, res)
    })


    app.get("/pre-signed/*path", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { path } = req.params as { path: string[] }
        const Key = path.join("/")
        const url = await s3Service.createPreSignedFetchLink({ Key })
        return successResponse({ res, data: { url } })
    })

    app.get('/*dummy', (req: express.Request, res: express.Response, next: express.NextFunction) => {

        res.status(404).json({ message: "Invalid Application Routing" })
    })


    // application-error
    app.use(globalErrorHandler)

    await connectDB()
    await redisService.connect()

    app.listen(PORT, () => {
        console.log(`Server is running on Port ${PORT}`);

    })

    const httpServer: HttpServerType = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

    realTimeGateway.initializeIo(httpServer)

    console.log("Application bootstrapped successfully")

}

export default bootstrap

