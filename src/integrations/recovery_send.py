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
            <style>
                h1 {{
                    font-family: Roboto, sans-serif;
                    color: #000000;
                    font-size: 24px;
                    text-align: center;
                }}
            </style>
        </head>
        <body>
            <h1>Olá! 😁</h1>
            <p>{token_recovery}</>
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