import EventCard from "@/components/EventLists/EventCard";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";

const CommunityPage = () => {
	const router = useRouter();
	const { communityname, communityID } = router.query;
	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div className="flex flex-col w-full px-32 py-8">
				<div className="flex flex-row justify-between border-b-2 border-neutral-300 pb-2">
					<h2 className="secondary-font text-4xl">{communityname}</h2>
					{/* Add Link with dynamic name and id around button */}
					<button className="primary-button secondary-font">Add Event</button>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
					<EventCard />
					<EventCard />
					<EventCard />
					<EventCard />
					<EventCard />
					<EventCard />
					<EventCard />
					<EventCard />
					<EventCard />
				</div>
			</div>
		</main>
	);
};

export default CommunityPage;
