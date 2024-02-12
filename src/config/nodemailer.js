"use strict";

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const send = (email) => {
    transporter.sendMail({
        from: process.env.MAIL_FROM, 
        to: email,
        subject: "Seja bem-vindo!",
        text: "Olá, bem vindo!"
    })
  };

