

    
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔐 Email transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sagarpatil8289@gmail.com",
    pass: "vzlwgpbkjnvirbiw",     // 👈 App Password (NO spaces)
  },
});

// ✅ Check connection (VERY IMPORTANT)
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ SMTP Error:", error);
  } else {
    console.log("✅ Server is ready to send emails");
  }
});

// 📩 API route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("📥 Incoming data:", req.body);

  try {
    const mailOptions = {
      from: `"Portfolio Contact" <your-email@gmail.com>`,
      to: "your-email@gmail.com", // where YOU receive message
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent");
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.log("❌ Error sending email:", error);
    res.status(500).send("Failed to send message");
  }
});

// 🚀 Start server
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
