import Link from "next/link";
import React from "react";

const RedirectSection = ({
	first_title,
	first_link,
	first_button,
	second_title,
	second_link,
	second_button,
}) => {
	return (
		<div className="flex flex-col pt-24 space-y-8">
			<div className="flex flex-row justify-between items-center">
				{/* VOLUNTEER SIGN UP */}
				<h3 className="secondary-font text-white text-4xl">{first_title}</h3>
				<Link href={`/${first_link}`}>
					<button className="register-button">{first_button}</button>
				</Link>
			</div>
			<div className="border-b-2 border-white"></div>
			<div className="flex flex-row space-x-8 items-center">
				{/* ORGANIZER SIGN UP */}
				<h3 className="secondary-font secondary-color-text text-4xl">
					{second_title}
				</h3>
				<Link href={`/${second_link}`}>
					<button className="register-button">{second_button}</button>
				</Link>
			</div>
		</div>
	);
};

export default RedirectSection;
