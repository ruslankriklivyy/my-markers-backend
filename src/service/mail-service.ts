import nodemailer from 'nodemailer';

class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMPT_USER,
      to,
      subject: `Active account ${process.env.API_URL}`,
      text: '',
      html: `
        <div>
          <h1>For activate account</h1>
          <a href='${link}' >${link}</a>
        </div>
      `,
    });
  }
}

export default new MailService();
