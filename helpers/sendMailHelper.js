const nodemailer = require("nodemailer");
const env = require("dotenv");
env.config();

exports.handleSendMailForgotPass = async (token, email) => {
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const message = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Reset Password JobPortal Ahmad Alif Sofian",
    html: `<body>
  <div
    style="
      font-family: Helvetica, Arial, sans-serif;
      min-width: 1000px;
      overflow: auto;
      line-height: 2;
    "
  >
    <div style="margin: 50px auto; width: 70%; padding: 20px 0">
      <div style="border-bottom: 1px solid #eee">
        <p
          style="
            font-size: 1.4em;
            color: rgb(163 230 53);
            text-decoration: none;
            font-weight: 600;
          "
        >
          JobPortal Ahmad Alif Sofian
        </p>
      </div>
      <p style="font-size: 1.1em">Hi,</p>
      <p>
        Thank you for choosing JobPortal Ahmad Alif Sofian. Use the following
        reset password to login
      </p>
      <h2
        style="
          background: rgb(163 230 53);
          margin: 0 auto;
          width: max-content;
          padding: 0 10px;
          color: #fff;
          border-radius: 4px;
        "
      >
        <p>
          Click to Reset Password from JobPortal
          <a
            href="http://localhost:3000/api/send-reset-password/${token}"
            id="sendPassword"
            target="_blank"
            >Reset Password</a
          >
        </p>
      </h2>
      <p style="font-size: 0.9em">Regards,<br />Ahmad Alif Sofian</p>
      <hr style="border: none; border-top: 1px solid #eee" />
    </div>
  </div>
</body>
`,
  };
  try {
    const info = await transport.sendMail(message);
    return info;
  } catch (error) {
    console.log(error);
  }
};
exports.sendResetPassword = async (new_password, email) => {
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const message = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Reset Password JobPortal Ahmad Alif Sofian",
    html: `<body>
  <div
    style="
      font-family: Helvetica, Arial, sans-serif;
      min-width: 1000px;
      overflow: auto;
      line-height: 2;
    "
  >
    <div style="margin: 50px auto; width: 70%; padding: 20px 0">
      <div style="border-bottom: 1px solid #eee">
        <p
          style="
            font-size: 1.4em;
            color: rgb(163 230 53);
            text-decoration: none;
            font-weight: 600;
          "
        >
          JobPortal Ahmad Alif Sofian
        </p>
      </div>
      <p style="font-size: 1.1em">Hi,</p>
      <p>
        Thank you for choosing JobPortal Ahmad Alif Sofian. Use the following
        reset password to login
      </p>
      <h2
        style="
          background: rgb(163 230 53);
          margin: 0 auto;
          width: max-content;
          padding: 0 10px;
          color: #fff;
          border-radius: 4px;
        "
      >
        <p>
         This Your Reset Password from JobPortal  : ${new_password}
        </p>
      </h2>
      <p style="font-size: 0.9em">Regards,<br />Ahmad Alif Sofian</p>
      <hr style="border: none; border-top: 1px solid #eee" />
    </div>
  </div>
</body>
`,
  };
  try {
    const info = await transport.sendMail(message);
    return info;
  } catch (error) {
    console.log(error);
  }
};
