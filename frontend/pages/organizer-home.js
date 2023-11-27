import CommunityCard from "@/components/CommunityLists/CommunityCard";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const OrganizerHome = () => {
	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div className="flex flex-row w-full justify-center ">
				<div className="flex flex-col w-full px-32 py-8 ">
					<div className="flex flex-row justify-between border-b pb-2 items-center">
						<h2 className="secondary-font text-4xl">Communities</h2>
						<Link href="organizer/create-community">
							<button className="primary-button secondary-font">
								Create New Community
							</button>
						</Link>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
						<CommunityCard />
						<CommunityCard />
						<CommunityCard />
						<CommunityCard />
						<CommunityCard />
						<CommunityCard />
					</div>
				</div>
			</div>
		</main>
	);
};

export default OrganizerHome;
