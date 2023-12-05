import EventCard from "@/components/EventLists/EventCard";
import Header from "@/components/Header";
import { httpRefreshAccessToken } from "@/utils/auth";
import { httpFetchEvents } from "@/utils/requests";
import { Underdog } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CommunityPage = () => {
	const router = useRouter();
	const { communityname, communityID } = router.query;
	const [events, setEvents] = useState([]);
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		const fetchData = async (fetched) => {
			try {
				const response = await httpFetchEvents(communityID);

				if (response.ok) {
					fetched = true;
					console.log(response);
					const response_json = await response.json();
					console.log(response_json);
					setEvents(response_json);
				} else if (!fetched) {
					fetched = true;
					await fetchToken();
					await fetchData(fetched);
				} else {
					console.log("Fetch failed");
				}
			} catch (error) {
				console.error("Error during fetch:", error);
			}
		};

		const fetchToken = async () => {
			try {
				await httpRefreshAccessToken();
				console.log(`Access Token: ${localStorage.getItem("access_token")}`);
			} catch (error) {
				console.error("Error during token refresh:", error);
			}
		};

		if (localStorage.getItem("is_admin") === "true") {
			setAdmin(true);
		} else {
			setAdmin(false);
		}

		let fetched = false;
		if (communityID !== undefined) {
			fetchData(fetched);
		}
	}, [communityID]);

	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div className="flex flex-col w-full px-32 py-8">
				<div className="flex flex-row justify-between border-b-2 border-neutral-300 pb-2">
					<h2 className="secondary-font text-4xl">{communityname}</h2>
					{/* Add Link with dynamic name and id around button */}
					{admin && (
						<Link
							href={`/community/add-event?communityname=${communityname}&communityID=${communityID}`}
						>
							<button className="primary-button secondary-font">
								Add Event
							</button>
						</Link>
					)}
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
					{events.map((event, id) => (
						<Link
							href={`/community/event?eventname=${event.event_name}&eventID=${event.id}`}
							key={id}
						>
							<EventCard
								event_name={event.event_name}
								event_organizer={event.event_organizer}
								community={event.community}
								start_date={event.start_date}
								end_date={event.end_date}
								start_time={event.start_time}
								end_time={event.end_time}
								street_address={event.street_address}
								zipcode={event.zipcode}
								city={event.city}
								state={event.state}
								building_number={event.building_number}
							/>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
};

export default CommunityPage;
