import { Suspense, lazy } from "react";
const Feed = lazy(() => import("@components/Feed"));

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Discover & Share
				<br className="max-md:hidden" />
				<span className="orange_gradient text-center"> People Minds</span>
			</h1>
			<p className="desc text-center">
				Consolepia is a platform where you can explore a world of ideas and
				connect with like-minded individuals. Share your thoughts, spark
				conversations, and be inspired by others.
			</p>

			<Suspense fallback={<p>Loading feed..</p>}>
				<Feed />
			</Suspense>
		</section>
	);
};

export default Home;
