import { getSession } from 'next-auth/client';
import dbConnect from '../../../utils/dbConnect';
import verifyCsrfToken from '../../../utils/verifyCsrfToken';
import { sendEmail } from '../../../utils/mailer';
import User from '../../../models/User.model';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator';

dbConnect();

export default async function ForgotPassword(req, res) {
	const session = await getSession({ req });

	if (session) {
		res.status(400).json({
			success: false,
			message: 'Password reset email not sent, you are already logged in.'
		});
	} else {
		try {
			const { email } = req.body;
			const isCsrfValid = await verifyCsrfToken({ req });

			if (isEmail(email) && isCsrfValid) {
				const user = await User.findOne({ email });

				if (user) {
					// create hash and store in users record
					const salt = await bcrypt.genSalt();
					const retrieveToken = await bcrypt.hash(
						user._id.toString(),
						salt
					);
					await User.findByIdAndUpdate(user._id, { retrieveToken });

					// send email with token
					const tokenLink = `${process.env.NEXTAUTH_URL}/auth/resetPassword?token=${retrieveToken}`;

					const message = {
						to: `${user.name} <${user.email}>`,
						subject: 'Reset your password',
						text: `Hi ${user.name}, forgot your password? Click on this link to reset your password: ${tokenLink}`,
						html: `<p>Hi <strong>${user.name}</strong>,</p><p>Forgot your password? Click on this link to reset your password:<br /><br /><a href="${tokenLink}">${tokenLink}</a></p>`
					};

					sendEmail(message);
				}

				res.status(200).json({
					success: true,
					message: 'Please check your inbox.'
				});
			} else {
				throw Error('Email or CSRF not valid');
			}
		} catch (error) {
			res.status(400).json({
				success: false,
				message: 'Email not valid.'
			});
		}
	}

	res.end();
}
