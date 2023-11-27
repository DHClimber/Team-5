import React from "react";

const CommunityCard = () => {
	{
		/* community name, city, state, admin */
	}
	return (
		<div className="flex flex-col bg-white  items-center p-4 rounded-xl drop-shadow-lg hover:bg-red-100 transition-all">
			<h3 className="primary-font text-3xl text-color-main">Community Name</h3>

			<div className="flex flex-row text-color-secondary secondary-font text-lg">
				<p>
					City, <span>State</span>
				</p>
			</div>
			<div className="text-color-tertiary secondary-font text-md mt-4">
				<p>
					Community Admin: <span>ADMIN NAME</span>
				</p>
			</div>
		</div>
	);
};

export default CommunityCard;
