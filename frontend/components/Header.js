import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
	const router = useRouter();
	const handleClick = () => {
		localStorage.clear();
		router.push("/");
	};
	return (
		<div className="header-container-styles">
			<Link href={"/home"}>
				<h1 className="items-center primary-font text-white text-3xl">
					Community Canvas
				</h1>
			</Link>
			<button onClick={handleClick} className="primary-button-red">
				Log Out
			</button>
		</div>
	);
};

export default Header;
