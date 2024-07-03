const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// sending form data to by email

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "ravipoddar0712@gmail.com",
    pass: "************",
  },
});

transporter.verify().then(console.log).catch(console.error);

app.post("/submit-form", (req, res) => {
  const { name, mobile, email, brandname, message } = req.body;

  const formData = {
    name,
    mobile,
    email,
    brandname,
    message,
  };

  const mailOptions = {
    from: "ravipoddar0712@gmail.com",
    to: "indiaglobal0@gmail.com",
    subject: "New Form Submission",
    text: `You have a new form submission:
    Name: ${formData.name}
    Mobile: ${formData.mobile}
    Email: ${formData.email}
    Brand Name: ${formData.brandname}
    Message: ${formData.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Error sending email: " + error.toString());
    }
    console.log("Email sent: " + info.response);
    res.status(200).send("Form data received and email sent successfully.");
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
