"use client";

import { useState, useEffect, lazy, Suspense } from "react";

const PromptCard = lazy(() => import("./PromptCard"));

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	);
};

const Feed = () => {
	const [posts, setPosts] = useState([]);

	const [searchText, setSearchText] = useState("");
	const [searchedResults, setSearchedResults] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch("api/prompt");
		const data = await response.json();
		setPosts(data);
	};

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, "i");

		return posts.filter(
			(item) =>
				regex.test(item.creator.username) ||
				regex.test(item.prompt) ||
				regex.test(item.tag)
		);
	};

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
		const searchResult = filterPrompts(e.target.value);
		setSearchedResults(searchResult);
	};

	const handleTagClick = (tag) => {
		setSearchText(tag);
		const searchResult = filterPrompts(tag);
		setSearchedResults(searchResult);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{searchText ? (
				<Suspense fallback={<div>Loading prompt...</div>}>
					<PromptCardList
						data={searchedResults}
						handleTagClick={handleTagClick}
					/>
				</Suspense>
			) : (
				<Suspense fallback={<div>Loading prompt...</div>}>
					<PromptCardList data={posts} handleTagClick={handleTagClick} />
				</Suspense>
			)}
		</section>
	);
};

export default Feed;
