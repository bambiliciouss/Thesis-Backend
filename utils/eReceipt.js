const nodemailer = require("nodemailer");

module.exports = async (email, subject, user) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const html = `
    <html>
    <head></head>
    <body>
      <div style="background-color: #f2f2f2; padding: 20px; width: 80%; max-width: 600px; margin: 20px auto;">
        <div style="background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="background-color: #9bbffa; border-radius: 5px; padding: 10px; height: auto;">
              <h1>${subject}</h1>
            </div>
          </div>
          
          <p>Hi, </p>
          <p>Thank you for using our service. To reset your password, please click the link below:</p>
          <div style="text-align: center;">
           
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    console.log("Email sent Successfully");
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};
