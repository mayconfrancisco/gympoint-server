import { resolve } from 'path';
import nodemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport(
      {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      {
        default: {
          from: process.env.MAIL_DEFAULT_FROM,
        },
      },
    );

    this.configureTemplate();
  }

  configureTemplate() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: 'hbs',
        }),
        viewPath,
        extName: '.hbs',
      }),
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      from: process.env.MAIL_DEFAULT_FROM,
      ...message,
    });
  }
}

export default new Mail();
