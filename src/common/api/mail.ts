const nodemailer = require('nodemailer');
require('dotenv').config();

type Data = {
	message: string;
	status: string | number;
};
type payload = {
	token: string;
	email: string;
};

export default async function sendRecoverMail(body: payload) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		port: Number(process.env.MAILING_PORT),
		host: process.env.MAILING_HOST,
		auth: {
			user: process.env.MAIL_EMAIL,
			pass: process.env.MAIL_PASSWORD,
		},
		secure: true,
	});

	const mailData = {
		from: process.env.APP_EMAIL,
		to: body.email,
		subject: `Tu recuperacion de contraseña`,
		html: `
            <div>Haz click aqui: ${process.env.FRONTEND_URL}/${body.token}</div>
        `,
	};
	console.log('About to send the mail...', body);
	const result: Data = await new Promise((resolve, reject) => {
		transporter.sendMail(mailData, function (err: any, info: any) {
			if (err) {
				console.error(err);
				reject({
					status: 500,
					message: 'Email not sent',
				});
			} else {
				console.log(info);
				resolve({
					status: 500,
					message: 'Email not sent',
				});
			}
		});
	});

	return result;
}
