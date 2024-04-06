// import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { connectToDB } from "@utils/database";
import User from "@models/user";

export const dynamic = "force-dynamic";
export async function POST(request) {
	const { fullName, username, inputPass } = await request.json();

	try {
		await connectToDB();
		const hashedPassword = await hash(inputPass, 10);
		await User.create({
			fullName: fullName,
			username: username.toLowerCase(),
			password: hashedPassword,
		});
		return new Response(JSON.stringify({ fullName, username, hashedPassword }));
	} catch (e) {
		console.log({ e });
		return new Response(JSON.stringify({ message: "failed" }));
	}
}
