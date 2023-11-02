import Link from "next/link";
import React from "react";

const LandingPage = () => {
	return (
		<main className="flex flex-col h-screen items-center justify-center">
			<h1 className="text-3xl pb-4">Welcome to Community Canvas</h1>
			{/* <h2 className="text-lg text-gray-400">
				Log in with your Community Canvas volunteer account to continue
			</h2> */}
			<div className="flex flex-row space-x-4 mt-4">
				<Link href="/login">
					<button className="primary-button">Login</button>
				</Link>
				<Link href="/sign-up">
					<button className="primary-button">Sign-up</button>
				</Link>
			</div>

			<div className="flex flex-row space-x-2 pt-4">
				<h6 className="text-gray-500">Are you an Organizer?</h6>
				<Link href="/login">
					<button class="tertiary-button">Click Here</button>
				</Link>
			</div>
		</main>
	);
};

export default LandingPage;
