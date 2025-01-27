const { Resend } = require("resend");
const instanceResend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (to) => {
  try {
    await instanceResend.emails.send({
      from: "no-reply@cashonomy.dev",
      //from: "onboarding@resend.dev",
      to: to,
      subject: "Hello World",
      html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    });
  } catch (error) {
    console.log("error", error);
    return sendErrorResponse(
      res,
      "Unexpected error during sending email.",
      "UNEXPECTED_ERROR",
      true
    );
  }
};

module.exports = sendWelcomeEmail;
