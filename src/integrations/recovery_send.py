import smtplib
import email.message
import os 
from dotenv import load_dotenv
import sys

def sendRecovery():

    load_dotenv()
    email_recovery = sys.argv[1]
    token_recovery = sys.argv[2]

    corpo_email = f'''
    <html>
        <head>
         <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            <title>recovery_email</title>
            <style>
                body {{
                    font-family: "Montserrat", sans-serif;
                    text-align: center;
                    margin: 50px;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 0 20px; 
                }}
                button {{
                    display: inline-block;
                    padding: 10px 20px;
                    width: 200px;
                    height: 45px;
                    border-radius: 8px;
                    border: none;
                    background-color: #cd1212;
                    transition: background-color 0.3s;
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                    margin-top: 20px;
                    cursor: pointer;
                }}
                button:hover {{
                    background-color: #780b0b;
                }}
                h1 {{
                    font-weight: 900;
                }}
                h2 {{
                    font-size: 32px;
                }}
                p {{
                    color: black;
                    font-size: 18px;
                    margin-bottom: 20px;
                }}
                .foot {{
                    color: #777;
                    font-style: italic;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Redefinição de Senha</h1>
                <p>Fala meu parça! Vejo que você solicitou um reset da sua senha. Aqui está o código para que você valide a alteração!</p>
                <h2>{token_recovery}</h2>
                <p>Agora, acesse o link abaixo para escolher uma nova senha</p>
                <a href="https://facpbm.netlify.app/logout"><button>ALTERAR MINHA SENHA</button></a>
                <p class="foot">Lembrando que este código de confirmação tem validade de 2 horas!</p>
            </div>
        </body>
    </html>
    '''

    msg = email.message.Message()
    msg['Subject'] = "Redefinir Senha"
    msg['From'] = os.getenv("MAIL_FROM")
    msg['To'] = email_recovery
    password = os.getenv("MAIL_PASS")
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email)

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()

    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('Email enviado com sucesso')

sendRecovery()