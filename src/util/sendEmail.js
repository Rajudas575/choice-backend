// import NodeFilter from "nodemailer";

// async function sendVerificationEmail(to, subject, body) {
//   const transpoter = NodeFilter.createTransport({
//     service: "gmail",
//     auth: {
//       user: "rajudasprojects@gmail.com",
//       pass: "hlux sbeb dbiq mcpj",
//     },
//   });

//   const mailOptions = {
//     from: "rajudasprojects@gmail.com",
//     to,
//     subject,
//     htm: body,
//   };
//   await transpoter.sendMail(mailOptions);
// }
// export default sendVerificationEmail;

import nodemailer from "nodemailer";

async function sendVerificationEmail(to, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rajudasprojects@gmail.com",
      pass: "hlux sbeb dbiq mcpj",
    },
  });

  const mailOptions = {
    from: "rajudasprojects@gmail.com",
    to,
    subject,
    text: body, // plain text
    html: `<p>${body}</p>`, // optional HTML
  };

  await transporter.sendMail(mailOptions);
}

export default sendVerificationEmail;
