import smtplib
import email.message
import os 
from dotenv import load_dotenv
import sys


def emailSend():
    
    load_dotenv()
    name_user = sys.argv[1]
    email_user = sys.argv[2]

    with open('../backend/src/integrations/index.html', 'r', encoding='utf-8') as file:
        corpo_email_html = file.read()

    corpo_email = f'''
    <html>
        <head>
            <style>
                h1 {{
                    font-family: Roboto, sans-serif;
                    color: #000000;
                    font-size: 32px;
                    text-align: center;
                }}
            </style>
        </head>
        <body>
            <h1>Olá, {name_user}!</h1>
            {corpo_email_html}
        </body>
    </html>
    '''

    msg = email.message.Message()
    msg['Subject'] = os.getenv("MAIL_SUBJECT")
    msg['From'] = os.getenv("MAIL_FROM")
    msg['To'] = email_user
    password = os.getenv("MAIL_PASS")
    msg.add_header('Content-Type', 'text/html')
    msg.set_payload(corpo_email)

    s = smtplib.SMTP('smtp.gmail.com: 587')
    s.starttls()

    s.login(msg['From'], password)
    s.sendmail(msg['From'], [msg['To']], msg.as_string().encode('utf-8'))
    print('Email enviado com sucesso')

emailSend()