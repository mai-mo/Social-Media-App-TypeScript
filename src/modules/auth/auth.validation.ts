import { z } from 'zod';
import { generalValidationFields } from '../../common/validation';

export const login = {
  body: z.object({
      email: generalValidationFields.email,
      password: generalValidationFields.password,
  }).catchall(z.string())
}


export const signup = {
    body: login.body.safeExtend({
      username: generalValidationFields.username,
      phone: generalValidationFields.phone.optional(),
      confirmPassword: generalValidationFields.confirmPassword
    }).refine((data)=>{
      return data.password === data.confirmPassword
    }, {error: 'password mismatch with confirm password'}),

    query: z.strictObject({
      flag: z.coerce.boolean()
    })

    
    // .superRefine((data, ctx) => {
    //     if (data.confirmPassword !== data.password){
    //       ctx.addIssue({
    //         path: ['confirmPassword'],
    //         message: 'password mismatch with confirm password',
    //         code: 'custom'
    //       })
    //     }

    //     if(data.email.includes(".lol")) {
    //       ctx.addIssue({
    //         path: ['email'],
    //         message: 'invalid domain',
    //         code: 'custom'
    //       })
    //     }
    // })
}
