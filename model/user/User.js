const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// defines the user schema
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"],
	},
	profilePhoto: {
		type: String,
		default:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu9zuWJ0xU19Mgk0dNFnl2KIc8E9Ch0zhfCg&usqp=CAU",
	},
	email: {
		type: String,
		required: [true, "Email address is required"],
		unique: true,
	},
	bio: {
		string: String,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	postCount: {
		type: Number,
		default: 0,
	},
	isBlocked: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		enum: ["Admin", "Guest", "Blogger"],
	},
	isFollowing: {
		type: Boolean,
		default: false,
	},
	isUnFollowing: {
		type: Boolean,
		default: false,
	},
	isAccountVerified: {
		type: Boolean,
		default: false,
	},
	accountVerificationToken: String,
	accountVerificationTokenExpires: Date,
	// This is an array that will hold the 
  // IDs of each user who views your profile
	viewedBy: {
		type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },],
    ref: 'User'
	},
  followers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },]
  },
  following: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },]
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: false
  },
}, { 
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }, 
  timestamps: true 
});


// create a middleware function to hash password; mongoose also
// lets us run middleware before creating each user instance
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);

	// hash user password
	this.password = await bcrypt.hash(this.password, salt);

	// proceed to next middleware
	next();
});

// compile schema into model
const User = mongoose.model('User', userSchema);
module.exports = User;