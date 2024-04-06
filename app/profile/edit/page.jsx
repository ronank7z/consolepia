"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const ProfileForm = lazy(() => import("@components/ProfileForm"));

const EditPage = () => {
	const router = useRouter();
	const { data: session } = useSession();
	const searchParams = useSearchParams();
	const userId = searchParams.get("id");

	if (!session) router.push(`/sign-in`);

	const [userData, setUserData] = useState({
		username: "",
		fullName: "",
		email: "",
		image: "",
		bio: "",
	});
	const [submitting, setSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const { username, fullName, bio } = userData;

		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, fullName, bio }),
			});

			if (!response.ok) {
				return new Response("Update failed", {
					status: 501,
				});
			} else {
				return new Response("Update success", {
					status: 200,
				});
			}
		} catch (error) {
			return new Response(error, {
				status: 501,
			});
		} finally {
			setSubmitting(false);
			router.push(`/profile/${userId}`);
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			const response = await fetch(`/api/users/${userId}`);
			const data = await response.json();
			setUserData(data);
		};
		if (userId) fetchUser();
	}, [userId]);

	return (
		<Suspense fallback={<div>Loading....</div>}>
			<ProfileForm
				userData={userData}
				setUserData={setUserData}
				handleSubmit={handleSubmit}
				submitting={submitting}
			/>
		</Suspense>
	);
};

export default EditPage;
