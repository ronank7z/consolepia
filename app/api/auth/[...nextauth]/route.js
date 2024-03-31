import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";

import User from "@models/user";

import { connectToDB } from "@utils/database";

const handler = NextAuth({
	pages: {
		signIn: "/sign-in",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "username", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials, req) {
				await connectToDB();

				const user = await User.findOne({ username: credentials?.username });

				const matchPassword = await compare(
					credentials?.password || "",
					user.password
				);

				if (matchPassword) {
					return {
						id: user._id,
						name: user.username,
						email: user.email || "",
						image: user.image || "",
					};
				}

				console.log({ credentials });
				return null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({
				$or: [{ email: session.user.email }, { username: session.user.name }],
			});
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ account, profile }) {
			try {
				await connectToDB();

				if (account?.provider === "google") {
					// check if a user already exists
					const userExists = await User.findOne({
						email: profile.email,
					});
					//if not, create a new user
					if (!userExists) {
						await User.create({
							email: profile.email,
							username: profile.name.replace(" ", "").toLowerCase(),
							image: profile.picture,
						});
					}
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
