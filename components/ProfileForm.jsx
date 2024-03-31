"use client";

import { useEffect, useState } from "react";
import { TbCircleCheckFilled } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [userProfile, setUserProfile] = useState({
		firstName: "",
		lastName: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		const { firstName, lastName } = userProfile;

		try {
			const response = await fetch("/api/users/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ firstName, lastName }),
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
			router.refresh();
		}
	};

	const validateForm = (e) => {
		e.preventDefault();
		handleSubmit(e);
	};
	return (
		<section className="w-full max-w-xl mt-20">
			<form
				className="t-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				onSubmit={(e) => {
					validateForm(e);
				}}>
				<div className="flex gap-3 items-center">
					<label className="w-full">
						<span className="font-satoshi font-semibold text-base text-gray-700">
							First Name
						</span>

						<input
							type="text"
							value={userProfile.firstName}
							onChange={(e) => {
								setUser({ ...userProfile, firstName: e.target.value });
							}}
							placeholder="Your First Name"
							required
							className="form_input"
						/>
					</label>
					<label className="w-full">
						<span className="font-satoshi font-semibold text-base text-gray-700">
							Last Name
						</span>

						<input
							type="text"
							value={userProfile.lastName}
							onChange={(e) => {
								setUser({ ...userProfile, lastName: e.target.value });
							}}
							placeholder="Your Last Name"
							required
							className="form_input"
						/>
					</label>
				</div>
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

export default ProfileForm;
