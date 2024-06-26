"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const handleSignOut = async () => {
		try {
			await signOut();
			router.push("/");
		} catch (error) {
			console.log({ error });
			return false;
		}
	};

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};

		setUpProviders();
	}, []);

	return (
		pathName !== "/sign-in" &&
		pathName !== "/sign-up" && (
			<nav className="flex-between w-full mb-16 pt-3">
				<Link href="/" className="flex gap-2 flex-center">
					<Image
						src="/assets/images/logo.svg"
						alt="Consolepia Logo"
						width={30}
						height={30}
						className="object-contain"
					/>
					<p className="logo_text">Consolepia</p>
				</Link>

				{/* Desktop Navigation */}
				<div className="sm:flex hidden">
					{session?.user ? (
						<div className="flex gap-3 md:gap-5">
							<Link href="/create-prompt" className="black_btn">
								Create Post
							</Link>

							<button
								type="button"
								onClick={handleSignOut}
								className="outline_btn">
								Sign Out
							</button>
							<Link href={`/profile/${session?.user.id}`}>
								<Image
									src={session?.user.image || "/assets/images/no-profile.svg"}
									width={37}
									height={37}
									className="rounded-full"
									alt="profile"
								/>
							</Link>
						</div>
					) : (
						<>
							{providers && (
								<button
									type="button"
									onClick={() => router.push("/sign-in")}
									className="black_btn">
									Sign In
								</button>
							)}
						</>
					)}
				</div>

				{/* Mobile Navigation */}
				<div className="sm:hidden flex relative">
					{session?.user ? (
						<div className="flex">
							<Image
								src={session?.user.image || "/assets/images/no-profile.svg"}
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
								onClick={() => {
									setToggleDropdown((prev) => !prev);
								}}
							/>
							{toggleDropdown && (
								<div className="dropdown">
									<Link
										href={`/profile/${session?.user.id}`}
										className="dropdown_link"
										onClick={() => setToggleDropdown(false)}>
										My Profile
									</Link>
									<Link
										href="/create-prompt"
										className="dropdown_link"
										onClick={() => setToggleDropdown(false)}>
										Create Post
									</Link>
									<button
										type="button"
										onClick={() => {
											setToggleDropdown(false);
											handleSignOut();
										}}
										className="mt-5 w-full black_btn">
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							{providers && (
								<button
									type="button"
									onClick={() => router.push("/sign-in")}
									className="black_btn">
									Sign In
								</button>
							)}
						</>
					)}
				</div>
			</nav>
		)
	);
};

export default Nav;
