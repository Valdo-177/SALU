import { FormData } from "@/components/ui/FormUser";
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transport = createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "keynerdelahozcontencraft@gmail.com",
      pass: "cqsi tfod rcxn gxjo",
    },
  } as SMTPTransport.Options);

export type Sender = { name: string; email: string; }

export const sendEmail = async (emailData: FormData) => {
    const { email, fullName, gender, id, phone } = emailData;
    await transport.sendMail({
        from: `"Solicitud de crédito SALU" <${email}>`,
        to: [email],
        subject: "Solicitud de crédito",
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./index.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">
    <style>
        body {
            font-family: "Raleway", sans-serif;
        }

        header {
            background-color: #f8f8f8;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .containerInfo {
            background-color: white;
            padding: 3rem;
        }

        main img {
            width: 100%;
        }
        main {
            display: flex;
            align-items: center;
            flex-direction: column;
        }

        footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
        }

        footer a {
            color: #4caf50;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <header>
        <img src="https://uni-dotaciones-mocha.vercel.app/_next/static/media/Unidotaciones_Logo2.8e5f34f2.svg" alt="">
    </header>
    <main>
        <img src="https://firebasestorage.googleapis.com/v0/b/unidotaciones-f49fc.appspot.com/o/EmailSalu.png?alt=media&token=60762323-6722-462d-bb53-e5db6d7fd011"
            alt="">
        <div class="containerInfo">
            <div class="header">
                <h1>¡Solicitud Recibida con Éxito!</h1>
            </div>
            <div class="content">
                <h2>Hola <strong>${fullName}</strong>,</h2>
                <p>Tu solicitud ha sido enviada con éxito. Agradecemos que te hayas puesto en contacto con nosotros.</p>
                <p>Nos pondremos en contacto contigo muy pronto para confirmarte el estado de tu trámite. Mientras tanto, si
                    tienes alguna pregunta o necesitas más información, no dudes en responder a este correo.</p>
                <p>¡Gracias por confiar en nosotros!</p>
                <p>Atentamente,<br>El equipo de <strong>SALU</strong></p>
            </div>
        </div>
    </main>
    <footer>
        <p>Este es un mensaje generado automáticamente. Por favor, no respondas directamente a este correo.</p>
                </p>
                <span>Copyright © 2024</span>
    </footer>
</body>

</html>
        `})

    return await transport.sendMail({
        from: '"Solicitud de crédito SALU" <raulhincapie8@gmail.com>',
        to: ["raulhincapie8@gmail.com"],
        subject: "Solicitud de crédito",
        html: `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario Recibido</title>
    <style>
        body {
            font-family: "Raleway", sans-serif;
        }

        header {
            background-color: #f8f8f8;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .containerInfo {
            background-color: white;
            padding: 3rem;
        }

        main img {
            width: 100%;
        }

        footer {
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 0.5rem;
            background-color: #f8f8f8;
        }

        footer img {
            opacity: 0.9;
            width: 10rem;
        }
    </style>
</head>

<body>
    <main>
        <img src="https://firebasestorage.googleapis.com/v0/b/unidotaciones-f49fc.appspot.com/o/EmailSalu.png?alt=media&token=60762323-6722-462d-bb53-e5db6d7fd011"
            alt="Imagen de cabecera">
        <div class="containerInfo">
            <h1>Hola, <br>¡Recibiste un nuevo correo de ${fullName}!</h1>
            <h2>Asunto: Solicitud de microcrédito</h2>
            <p>Los datos recibidos fueron:</p>
            <ul>
                <li><strong>Cédula de ciudadanía:</strong> ${id}</li>
                <li><strong>Teléfono móvil:</strong> ${phone}</li>
                <li><strong>Nombre completo:</strong> ${fullName}</li>
                <li><strong>Correo electrónico:</strong> ${email}</li>
                <li><strong>Género:</strong> ${gender}</li>
            </ul>
        </div>
    </main>
</body>

</html>

    `,
    });
};
