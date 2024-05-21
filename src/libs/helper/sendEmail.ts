import * as nodemailer from 'nodemailer';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { Messages } from '../utils/message';
dotenv.config();

const sendEmail = (mailDetail: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
      service: 'Gmail',
      secure: false,
      port: parseInt(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transport.sendMail(mailDetail, (error, info) => {
      if (error) {
        reject(error);
      } else {
        Logger.log(`Email has been '${Messages.SEND_SUCCESS}`);
        resolve(info);
      }
    });
  });
};

export const otpSend = (
  email: string,
  htmlContent: string,
  subject?: string,
) => {
  const mailDetail = {
    to: email,
    subject: subject ?? 'OTP for new Password',
    html: htmlContent,
  };

  return sendEmail(mailDetail);
};
