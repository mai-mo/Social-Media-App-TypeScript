import nodemailer from 'nodemailer';
import { APP_EMAIL, APP_EMAIL_PASSWORD, APPLICATION_NAME } from '../../../config/config';
import { BadRequestException } from '../../exceptions';
import Mail from 'nodemailer/lib/mailer';

export const sendEmail = async ({
    to,
    cc,
    bcc,
    html,
    subject,
    attachments = [],
}: Mail.Options): Promise<void> => {

    if (!to && !cc && !bcc) {
        throw new BadRequestException( "Invalid recipient" );
    }

    if (!(html as string)?.length && !attachments?.length) {
        throw new BadRequestException( "Invalid mail content" );
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: APP_EMAIL,
            pass: APP_EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: `"${APPLICATION_NAME}" <${APP_EMAIL}>`,         
        to,
        cc,
        bcc,
        html,
        subject,
        attachments, 
    });

    console.log('Message sent: ', info.messageId);
    
};