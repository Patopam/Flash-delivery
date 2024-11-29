const brevo = require("@getbrevo/brevo"); // https://developers.brevo.com/
require("dotenv/config");

let apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

let sendSmtpEmail = new brevo.SendSmtpEmail();

const sendEmail = async (winner) => {
  sendSmtpEmail.subject = "My First Email";
  sendSmtpEmail.htmlContent =
     `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Gracias por jugar!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            text-align: center;
            background-color: #ffffff;
            padding: 20px 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            width: 90%;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            color: #29A7D9;
        }

        .message {
            font-size: 18px;
            margin: 15px 0;
            color: #555;
        }

        .coupon {
            margin: 20px 0;
            padding: 10px;
            border: 2px dashed #29A7D9;
            border-radius: 5px;
            background-color: #e9f6fc;
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }

        .footer {
            font-size: 14px;
            color: #777;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">¡Felicidades, ${winner.Name}!</h1>
        <p class="message">Gracias por participar y ganar en nuestro juego. Como recompensa, has obtenido el siguiente cupón:</p>
        <div class="coupon">
            <span>KSDI-32JE-O212</span>
        </div>
        <p class="footer">¡Utiliza tu cupón y sigue disfrutando con nosotros!</p>
    </div>
</body>
</html>
`;
  sendSmtpEmail.sender = {
    name: "david",
    email: "davidcardona8702@gmail.com",
  };
  sendSmtpEmail.to = [
    { email: winner.Email, name: winner.Name },
  ];
  sendSmtpEmail.replyTo = {
    email: "Davidcardona8702@gmail.com",
    name: "Support",
  };
  sendSmtpEmail.params = { parameter: "My param value" };

  try {
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error(error);
  }
};

const sendEmailWithTemplate = async () => {
    sendSmtpEmail.templateId = 1;
    sendSmtpEmail.sender = {
      name: "John Cena",
      email: "youraccountemail@gmail.com",
    };
    sendSmtpEmail.to = [
      { email: "destinationemail@gmail.com", name: "User Name" },
    ];
    sendSmtpEmail.replyTo = {
      email: "emailtoreplyto@gmail.com",
      name: "Support",
    };
    sendSmtpEmail.params = { parameter: "My param value" };
  
    try {
      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log(JSON.stringify(response));
    } catch (error) {
      console.error(error);
    }
  };

module.exports = { sendEmail, sendEmailWithTemplate };