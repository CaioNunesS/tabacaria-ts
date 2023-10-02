export const generateVerificationEmailHTML = (code: string) => {
  const emailHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verificação de Email</title>
        </head>
        <body>
            <table style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <tr>
                    <td style="background-color: #007BFF; text-align: center; padding: 10px;">
                        <h1 style="color: #ffffff;">Código de Verificação</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <p>Olá,</p>
                        <p>Seu código de verificação é:</p>
                        <h2 style="background-color: #007BFF; color: #ffffff; padding: 10px; text-align: center;">${code}</h2>
                        <p>Por favor, use este código para verificar sua conta.</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #007BFF; text-align: center; padding: 10px;">
                        <p style="color: #ffffff;">Obrigado por escolher nossos serviços.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

  return emailHTML;
};
