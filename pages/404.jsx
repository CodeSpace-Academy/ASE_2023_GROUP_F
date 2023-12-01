import React from "react";
import Link from "next/link";
import Head from "next/head";

/**
 * NotFoundPage component displays a custom 404 error page.
 *
 * This component provides a user-friendly message and a link to navigate
 * back to the home page when a user encounters a page not found (404) error.
 *
 * @returns {JSX.Element} - The JSX markup for the NotFoundPage component.
 */

function NotFoundPage() {
	return (
		<>
			<Head>
				<title>Page Not Found - Culinary Quests</title>
				<meta
					name="description"
					content="Oops! It seems like you've ventured into uncharted culinary territory. The page you're looking for might be sizzling in another part of our kitchen. Apologies for the detour! Let's get you back to the main course of Flavorful Favorites. Explore, savor, and continue your delightful culinary journey with us. 🍳✨"
				/>
			</Head>
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<h1 className="text-6xl font-bold text-gray-800">404</h1>
				<p className="text-xl text-gray-600 mb-4">Page Not Found</p>
				<Link href="/">
					<div className="bg-blue-500 text-white rounded py-2 px-4 cursor-pointer hover:bg-blue-700">
						Go back to home
					</div>
				</Link>
			</div>
		</>
	);
}

export default NotFoundPage;
