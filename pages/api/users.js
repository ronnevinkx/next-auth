import { getSession } from 'next-auth/client';
import dbConnect from '../../utils/dbConnect';
import User from '../../models/User.model';

dbConnect();

export default async function Users(req, res) {
	const session = await getSession({ req });

	if (session) {
		const users = await User.find(
			{},
			'name email loginCount lastLoginAt createdAt'
		);
		res.status(200).json({ users });
	} else {
		res.status(401).json({ error: 'Unauthorized' });
	}

	res.end();
}
