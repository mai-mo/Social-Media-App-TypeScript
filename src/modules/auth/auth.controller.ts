
import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import authService from "./auth.service";
import { successResponse } from "../../common/response";
import { ILoginResponse } from "./auth.entity";
import * as validators from './auth.validation'
import { validation } from "../../middleware";
// import { BadRequestException } from "../../common/exceptions";

const router = Router()

router.post(
    "/login",
    validation(validators.login),
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    // const validationResult = validators.login.body.safeParse(req.body)
    // console.log({validationResult});

    // if(!validationResult.success){
    //     throw new BadRequestException('Validation Error', {error: JSON.parse(validationResult.error as unknown as string)})
    // }
    
    const data = await authService.login(req.body)
    return successResponse<ILoginResponse>({ res, data })

})

router.post(
    '/signup',
    validation(validators.signup),
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    
    // const validationResult = validators.signup.body.safeParse(req.body)
    // console.log({validationResult});
    
    // if(!validationResult.success){
    //     throw new BadRequestException('Validation Error', {error : JSON.parse(validationResult.error as unknown as string)})
    // }
    const data = await authService.signup(req.body)
    return successResponse<any>({ res,status:201 ,data })
})

export default router
