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
      port: 25,
      auth: {
        user: 'jayraychura.shivinfotech@gmail.com',
        pass: 'ytuo avhy mzhz pvuj',
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
