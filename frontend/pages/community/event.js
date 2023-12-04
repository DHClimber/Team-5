import Header from "@/components/Header";
import { useRouter } from "next/router";
import React from "react";

const Event = () => {
	const router = useRouter();
	const { eventname, eventID } = router.query;
	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div>Event</div>
		</main>
	);
};

export default Event;
