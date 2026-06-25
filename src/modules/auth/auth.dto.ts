import {z} from 'zod';
import { confirmEmail, login, resendConfirmEmail, signup } from './auth.validation';

export type LoginDto = z.infer<typeof login.body>
export type SignupDto = z.infer<typeof signup.body>
export type ConfirmEmailDto = z.infer<typeof confirmEmail.body>
export type ResendConfirmEmailDto = z.infer<typeof resendConfirmEmail.body>

// export interface ILoginDto {
//     email: string;
//     password: string;
// }

// export interface ISignupDto extends ILoginDto {
//     username: string;
// }

