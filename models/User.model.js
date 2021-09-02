const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const { sendEmail } = require('../utils/mailer');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter a name'],
			trim: true,
			minlength: 1,
			maxlength: [40, 'Your name can only have 40 characters.']
		},
		email: {
			type: String,
			required: [true, 'Please enter an email address.'],
			unique: true,
			trim: true,
			minlength: 5,
			lowercase: true,
			validate: [isEmail, 'Please enter a valid email address.']
		},
		password: {
			type: String,
			trim: true,
			minlength: process.env.PASSWORD_MINLENGTH
		},
		retrieveToken: {
			type: String,
			trim: true
		},
		image: String,
		loginCount: {
			type: Number,
			default: 1
		},
		lastLoginAt: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: true
	}
);

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	const user = this;

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, salt);
	}

	next();
});

// static methods
userSchema.statics.login = async function (email, password) {
	let user = await this.findOne({ email });

	if (user) {
		if (!user.password) {
			throw Error('No password set, try with social provider');
		}

		const auth = await bcrypt.compare(password, user.password);

		if (auth) {
			user.loginCount = user.loginCount + 1;
			user.lastLoginAt = new Date();
			await user.save();

			return user;
		}

		throw Error('Password is incorrect');
	}

	throw Error('Email is incorrect');
};

userSchema.statics.add = async function (userProps) {
	const user = await this.create(userProps);

	if (user) {
		// send welcome email
		const message = {
			to: `${user.name} <${user.email}>`,
			subject: 'Welcome to NextAuth',
			text: `Hi ${user.name}, welcome to NextAuth! You've signed up with email ${user.email}`,
			html: `<p>Hi <strong>${user.name}</strong>,</p><p>Welcome to NextAuth! You've signed up with email ${user.email}</p>`
		};

		sendEmail(message);

		return user;
	}

	throw Error('Account cannot be created');
};

userSchema.statics.findByIdAndUpdatePassword = async function (
	userId,
	password
) {
	let user = await this.findById(userId);

	if (user) {
		user.password = password;
		user.retrieveToken = undefined;
		await user.save();

		return user;
	}

	throw Error('User cannot be found');
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
