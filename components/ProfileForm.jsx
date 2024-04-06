const ProfileForm = ({ userData, setUserData, handleSubmit, submitting }) => {
	return (
		<section className="w-full max-w-xl">
			<h1 className="head_text text-left mb-6">
				<span className="blue_gradient">Edit Profile</span>
			</h1>
			<form
				className="t-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
				onSubmit={handleSubmit}>
				<label className="w-full">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Full Name
					</span>

					<input
						type="text"
						value={userData.fullName}
						onChange={(e) => {
							setUserData({ ...userData, fullName: e.target.value });
						}}
						placeholder="Your Full Name"
						required
						className="form_input"
					/>
				</label>
				<label className="w-full">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Username
					</span>

					<input
						type="text"
						value={userData.username}
						onChange={(e) => {
							setUserData({ ...userData, username: e.target.value });
						}}
						placeholder="Your Username"
						required
						className="form_input"
					/>
				</label>
				<label className="w-full">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Bio
					</span>

					<input
						type="text"
						value={userData.bio}
						onChange={(e) => {
							setUserData({ ...userData, bio: e.target.value });
						}}
						placeholder="Your Bio"
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
			</form>
		</section>
	);
};

export default ProfileForm;
