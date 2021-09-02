// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

export async function sendEmail(msg) {
	let message = msg;

	if (!message.from) {
		message.from = `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`;
	}

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);

	try {
		await sgMail.send(message);
		console.log('Email sent');
	} catch (error) {
		console.error(error);
	}

	// nodemailer
	// return new Promise((resolve, reject) => {
	// 	const transporter = nodemailer.createTransport({
	// 		service: process.env.EMAIL_SERVICE,
	// 		auth: {
	// 			user: process.env.EMAIL_AUTH_USER,
	// 			pass: process.env.EMAIL_AUTH_PASS
	// 		}
	// 	});

	// 	transporter.sendMail(message, (error, info) => {
	// 		if (error) {
	// 			reject(error);
	// 		} else {
	// 			resolve(info);
	// 		}
	// 	});
	// });
}
