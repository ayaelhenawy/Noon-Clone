import { createTransport } from "nodemailer";
import jwt from 'jsonwebtoken'
import { htmltemplate } from "./htmltemplate.js";




export const sendEmails = async (email, token) => {  // ✅ استقبلي التوكن من برة
  const transporter = await createTransport({
    service: "gmail",
    auth: {
      user: "ayaalaaelhenawy@gmail.com",
      pass: "lagcwnjyjgybydbc",
    },
  });

  const info = await transporter.sendMail({
    from: '"Noon App" <ayaalaaelhenawy@gmail.com>',
    to: email,
    subject: "Confirm your email ✅",
    html: htmltemplate(token), // ✅ استخدمي نفس التوكن
  });
};