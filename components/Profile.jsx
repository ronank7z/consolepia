import { useSession } from "next-auth/react";
import { lazy, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
const PromptCard = lazy(() => import("./PromptCard"));

const Profile = ({ userData, data, handleEdit, handleDelete, params }) => {
	const router = useRouter();

	const handleEditProfile = () => {
		router.push(`/profile/edit?id=${params.id}`);
	};

	const { data: session } = useSession();
	return (
		<section className="w-full">
			<div className="flex justify-between">
				<Image
					src={userData.image || "/assets/images/no-profile.svg"}
					width={80}
					height={80}
					alt={`${userData.username}-profile-picture`}
					loading="lazy"
					className="rounded-full object-contain"
				/>
				{session?.user.id === params.id && (
					<button
						type="button"
						className="black_btn w-fit mt-6 h-9"
						onClick={handleEditProfile}>
						Edit Profile
					</button>
				)}
			</div>
			<h1 className="head_text text-left">
				<span className="blue_gradient">
					{userData.fullName || userData.username}
				</span>
			</h1>
			<p className="text-gray-700 text-left mt-3">{"@" + userData.username}</p>
			<p className="desc text-left">{userData.bio || "No bio provided"}</p>
			<div className="flex gap-3">
				<p>
					<strong>0</strong> Following
				</p>
				<p>
					<strong>0</strong> Followers
				</p>
			</div>

			<div className="mt-10 prompt_layout">
				{data.map((post) => (
					<Suspense fallback={<div>Loading Prompt...</div>}>
						<PromptCard
							key={post._id}
							post={post}
							handleEdit={() => handleEdit && handleEdit(post)}
							handleDelete={() => handleDelete && handleDelete(post)}
						/>
					</Suspense>
				))}
			</div>
		</section>
	);
};

export default Profile;
