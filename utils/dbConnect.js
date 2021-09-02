import mongoose from 'mongoose';

const connection = {};

export default async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	const conn = await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	connection.isConnected = conn.connections[0].readyState;
	console.log(`MongoDB connected: ${conn.connection.host}`);
}
