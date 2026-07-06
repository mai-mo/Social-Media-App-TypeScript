import { z } from 'zod';
import { generalValidationFields } from '../../common/validation';

export const resendConfirmEmail = {
  body: z.strictObject({
    email: generalValidationFields.email,
  })
}

export const confirmEmail = {
  body: resendConfirmEmail.body.safeExtend({
    otp: generalValidationFields.otp
  })
}


export const login = {
  body: resendConfirmEmail.body.safeExtend({
      password: generalValidationFields.password,
      FCM: z.string().optional()
  })
  // .catchall(z.string())
}


export const signup = {
    body: login.body.safeExtend({
      username: generalValidationFields.username,
      phone: generalValidationFields.phone.optional(),
      confirmPassword: generalValidationFields.confirmPassword
    }).refine((data)=>{
      return data.password === data.confirmPassword
    }, {error: 'password mismatch with confirm password'}),

    // query: z.strictObject({
    //   flag: z.coerce.boolean()
    // })

    
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
