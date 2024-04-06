"use client";

import { useEffect, useState } from "react";
import { TbCircleCheckFilled } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [isSamePassword, setIsSamePassword] = useState(false);
	const [checkPassLength, setCheckPassLength] = useState(false);
	const [minPassLength, setMinPassLength] = useState(8);
	const [user, setUser] = useState({
		fullName: "",
		username: "",
		inputPass: "",
		confirmPass: "",
	});

	useEffect(() => {
		validatePassLength();
		validatePassConfirm();
	}, [user]);

	const validatePassLength = () => {
		if (user.inputPass.length >= minPassLength) {
			setCheckPassLength(true);
			return true;
		} else {
			setCheckPassLength(false);
			return false;
		}
	};

	const validatePassConfirm = () => {
		const passInput = user.inputPass;
		const passConfirm = user.confirmPass;

		if (passInput !== passConfirm) {
			setIsSamePassword(false);
			return false;
		} else {
			setIsSamePassword(true);
			return true;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		const { fullName, username, inputPass, confirmPass } = user;

		try {
			const response = await fetch("/api/auth/register/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ fullName, username, inputPass, confirmPass }),
			});

			if (!response.ok) {
				return new Response("Register failed", {
					status: 501,
				});
			} else {
				return new Response("Register success", {
					status: 200,
				});
			}
		} catch (error) {
			return new Response(error, {
				status: 501,
			});
		} finally {
			setSubmitting(false);
			router.push("/sign-in");
		}
	};

	const validateForm = (e) => {
		e.preventDefault();
		if (validatePassConfirm() && validatePassLength()) {
			handleSubmit(e);
		} else {
			alert("Check again");
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
			<p className="desc font-bold my-10">Sign Up</p>
			<form
				className="t-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				onSubmit={(e) => {
					validateForm(e);
				}}>
				<label className="w-full">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Full Name
					</span>

					<input
						type="text"
						value={user.fullName}
						onChange={(e) => {
							setUser({ ...user, fullName: e.target.value });
						}}
						placeholder="Your Full Name"
						required
						className="form_input"
					/>
				</label>
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
						placeholder="Your Username"
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
						value={user.inputPass}
						onChange={(e) => {
							validatePassLength(e.target.value);
							validatePassConfirm(e.target.value);
							setUser({ ...user, inputPass: e.target.value });
						}}
						placeholder="Your Password"
						required
						className="form_input"
					/>
					<span
						className={`text-xs flex gap-1 items-center mt-2 ${
							checkPassLength ? "text-gray-700" : "text-red-400"
						} `}>
						Min. {`${minPassLength}`} character
						{checkPassLength && (
							<TbCircleCheckFilled
								size={16}
								color={"currenColor"}
								className="text-green-400"
							/>
						)}
					</span>
				</label>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Confirm Password
					</span>
					<input
						type="password"
						value={user.confirmPass}
						onChange={(e) => {
							validatePassLength(e.target.value);
							validatePassConfirm(e.target.value);
							setUser({ ...user, confirmPass: e.target.value });
						}}
						placeholder="Confirm Password"
						required
						className={`form_input ${
							!isSamePassword ? "ring-1 ring-red-400" : ""
						}`}
					/>
					{user.confirmPass !== "" &&
						(isSamePassword ? (
							<span className="text-xs flex gap-1 items-center mt-2 text-gray-700">
								Password match{" "}
								<TbCircleCheckFilled
									size={16}
									color={"currenColor"}
									className="text-green-400"
								/>
							</span>
						) : (
							<span className="text-xs flex gap-1 items-center mt-2 text-red-400">
								Password do not match
							</span>
						))}
				</label>
				<button
					type="submit"
					disabled={submitting}
					className={`font-satoshi px-5 py-1.5 text-base bg-primary-orange rounded-full text-white ${
						submitting ? "disabled" : ""
					} `}>
					{submitting ? "Submitting...." : "Submit"}
				</button>
			</form>
		</section>
	);
};

export default Register;
