const sendGridMail = require("@sendgrid/mail");

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.formContact = (req, res) => {
  const { email, name, message } = req.body;
  const emailContent = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Contact form - ${process.env.APP_NAME}`,
    text: `Email received from contact form \n sender name ${name} \n sender email: ${email} sender message ${message}`,
    html: `
        <hr/>
        <h4>Email received from contact form:</h4>
        <p>Sender name: ${name}</p>
        <p>Sender email: ${email}</p>
        <p>Sender messgae: ${message}</p>
        <hr/>
        <p>This email may contain sensetive information</p>
        <p>https://www.seoblog.com</p>
    `,
  };

exports.formAuthorContact = (req, res) => {
  const { authorEmail, email, name, message } = req.body;
  const emailContent = {
    to: [authorEmail, process.env.EMAIL_TO],
    from: email,
    subject: `Someone messaged you form - ${process.env.APP_NAME}`,
    text: `Email received from contact form \n sender name ${name} \n sender email: ${email} sender message ${message}`,
    html: `
        <hr/>
        <h4>Message received from:</h4>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Messgae: ${message}</p>
        <hr/>
        <p>This email may contain sensetive information</p>
        <p>https://www.seoblog.com</p>
    `,
  };

  sendGridMail.send(emailContent).then((send) => {
    return res
      .status(200)
      .json({
        success: true,
        emailContent,
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  });
};
