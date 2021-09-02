import { getSession } from 'next-auth/client';
import dbConnect from '../../../utils/dbConnect';
import verifyCsrfToken from '../../../utils/verifyCsrfToken';
import { sendEmail } from '../../../utils/mailer';
import User from '../../../models/User.model';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator';

dbConnect();

export default async function ResetPassword(req, res) {
	const session = await getSession({ req });

	if (session) {
		res.status(400).json({
			success: false,
			message: 'Password cannot be reset, you are already logged in.'
		});
	} else {
		try {
			const { userId, password } = req.body;
			const isCsrfValid = await verifyCsrfToken({ req });

			if (
				password &&
				password.length >= process.env.PASSWORD_MINLENGTH &&
				isCsrfValid
			) {
				await User.findByIdAndUpdatePassword(userId, password);

				res.status(200).json({
					success: true,
					message: 'Password reset.'
				});
			} else {
				throw Error('User, password or CSRF not valid');
			}
		} catch (error) {
			res.status(400).json({
				success: false,
				message: 'Password not valid.'
			});
		}
	}

	res.end();
}
