import type { Request, Response, NextFunction } from "express";
import { BadRequestException, MapGraphQLError } from "../common/exceptions";
import { ZodError, ZodType } from "zod";


// schema = signup
// keyReqType = 'body' || 'query' || 'params' || ....
type keyReqType = keyof Request
//                Record<keyType, valueType>
type SchemaType = Partial<Record<keyReqType, ZodType>>
type IssuesType = Array<{
    key: keyReqType,
    issues: Array<{
        message: string,
        path: (symbol | number | string | undefined | null)[]
    }>
}>
export const validation = (schema: SchemaType) => {

    return (req: Request, res: Response, next: NextFunction) => {
        console.log(Object.keys(schema));
        // issues = validationErrors
        const issues: IssuesType = [];



        for (const key of Object.keys(schema) as keyReqType[]) {
            // will return array carrying the key
            // const validationResult = validators.signup.body.safeParse(req.body)
            // schema = signup, key = body
            if (!schema[key]) continue;
            if (req.file) {
                req.body.file = req.file
            }
            if (req.files) {
                req.body.files = req.files
            }
            const validationResult = schema[key].safeParse(req[key])

            if (!validationResult.success) {
                const error = validationResult.error as ZodError
                issues.push({ key, issues: error.issues.map(issue => { return { path: issue.path, message: issue.message } }) })
            }
        }

        if (issues.length) {
            throw new BadRequestException('Validation Error', { issues })
        }

        next()

    }
}

export const GQLValidation = async <T>(schema: ZodType, args: T): Promise<boolean> => {

    const validationResult = schema.safeParse(args)

    if (!validationResult.success) {
        throw MapGraphQLError(new BadRequestException("Validation Error", {
            issues: validationResult.error.issues.map(issue => { return { path: issue.path, message: issue.message } })
        }))
    }
    return true
}
export const SocketValidation = async <T>(schema: ZodType, args: T): Promise<boolean> => {

    const validationResult = schema.safeParse(args)

    if (!validationResult.success) {
        throw new BadRequestException("Validation Error", {
            issues: validationResult.error.issues.map(issue => { return { path: issue.path, message: issue.message } })
        })
    }
    return true
}
