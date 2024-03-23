"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
// import { hash } from "bcrypt";

const Login = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [user, setUser] = useState({
		username: "",
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const { username, password } = user;

		// const hashedPassword = await hash(password, 10);

		try {
			const response = await signIn("credentials", {
				redirect: false,
				username,
				password,
			});

			console.log({ response });

			if (!response?.error) {
				router.push("/");
				router.refresh();
			}

			if (!response.ok) {
				return new Response("Sign in failed", {
					status: 501,
				});
			} else {
				return new Response("Sign in success", {
					status: 200,
				});
			}
		} catch (error) {
			return new Response("Error:" + error, {
				status: 501,
			});
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="w-full max-w-xl mt-20">
			<div className="flex justify-center items-center gap-3">
				<Image
					src="/assets/images/logo.svg"
					alt="Consolepia Logo"
					width={42}
					height={42}
					className="object-contain"
				/>
				<p className="font-satoshi font-bold text-3xl">Consolepia</p>
			</div>
			<p className="desc font-bold my-10">Sign In</p>
			<form
				className="t-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				onSubmit={handleSubmit}>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Username
					</span>

					<input
						type="text"
						value={user.username}
						onChange={(e) => {
							setUser({ ...user, username: e.target.value });
						}}
						placeholder="Your username"
						required
						className="form_input"
					/>
				</label>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Password
					</span>

					<input
						type="password"
						value={user.password}
						onChange={(e) => {
							setUser({ ...user, password: e.target.value });
						}}
						placeholder="Your Password"
						required
						className="form_input"
					/>
				</label>
				<button
					type="submit"
					disabled={submitting}
					className={`font-satoshi px-5 py-1.5 text-base bg-primary-orange rounded-full text-white ${
						submitting ? "disabled" : ""
					} `}>
					{submitting ? "Submitting...." : "Submit"}
				</button>
				<div className="text-center flex flex-col gap-3">
					<p>
						Don't have an account?{" "}
						<Link href={"/sign-up"} className="underline">
							Sign up here
						</Link>
					</p>
					<p>or</p>
					<button
						onClick={() => {
							signIn("google");
						}}
						className="font-satoshi px-5 py-1.5 text-base rounded-full border-gray-400 border flex justify-center items-center gap-2">
						<FcGoogle size={24} /> Sign in with google
					</button>
				</div>
			</form>
		</section>
	);
};

export default Login;
