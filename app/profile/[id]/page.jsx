"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = lazy(() => import("@components/Profile"));

const UserProfile = ({ params }) => {
	const router = useRouter();
	const { data: session } = useSession();

	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState({
		username: "",
		fullName: "",
		email: "",
		image: "",
		bio: "",
	});

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${params.id}/posts`);
			const data = await response.json();
			setPosts(data);
		};

		const fetchUser = async () => {
			const response = await fetch(`/api/users/${params.id}`);
			const data = await response.json();
			setUserData(data);
		};

		fetchPosts();
		fetchUser();
	}, []);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});

				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Profile
				userData={userData}
				params={params}
				data={posts}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</Suspense>
	);
};

export default UserProfile;
