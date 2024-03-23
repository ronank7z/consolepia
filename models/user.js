import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists"],
	},
	username: {
		type: String,
		required: [true, "Username is required"],
	},
	password: {
		type: String,
	},
	image: {
		type: String,
	},
});

const User = models.User || model("User", UserSchema);

export default User;
