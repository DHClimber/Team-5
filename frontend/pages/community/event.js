import EventMessage from "@/components/EventLists/EventMessage";
import Header from "@/components/Header";
import { httpRefreshAccessToken } from "@/utils/auth";
import { httpFetchEventMessages } from "@/utils/requests";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Event = () => {
	const router = useRouter();
	const { eventname, eventID } = router.query;
	const [admin, setAdmin] = useState(false);
	const [messages, setMessages] = useState([]);
	const [files, setFiles] = useState([]);

	useEffect(() => {
		const fetchData = async (fetched) => {
			try {
				const response = await httpFetchEventMessages(eventID);

				if (response.ok) {
					fetched = true;
					console.log(response);
					const response_json = await response.json();
					console.log(response_json);
					setMessages(response_json);
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

		if (eventID !== undefined) {
			fetchData();
		}
	}, [eventID]);

	{
		/* NEEDS:
        1. Organizer file upload button that links to page
        2. Organizer post message that links to page
        3. View all files for event
        4. View all updates for event
        5. User volunteer sign up
        6. See all volunteers by username and first+last names
    */
	}
	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div className="flex flex-col w-full px-32 py-8">
				<div className="flex flex-row justify-between border-b-2 border-neutral-300 pb-2">
					<h2 className="secondary-font text-4xl">{eventname}</h2>
					{/* Add Link with dynamic name and id around button */}
					{admin && (
						<div className="flex flex-row space-x-2">
							<Link
								href={`/community/event/post-message?eventID=${eventID}&eventname=${eventname}`}
							>
								<button className="primary-button secondary-font">
									Post Message
								</button>
							</Link>
							<Link
								href={`/community/event/upload-file?eventname=${eventname}&eventID=${eventID}`}
							>
								<button className="primary-button secondary-font">
									Upload File
								</button>
							</Link>
						</div>
					)}
				</div>

				<div className="flex flex-col secondary-font text-2xl mt-4">
					<h3>
						<span className="border-b-2 border-neutral-400">
							Messages From Organizer
						</span>
					</h3>
					<div className="flex flex-col mt-4 space-y-2  ">
						{messages.map((message, id) => (
							<EventMessage
								message={message.Message}
								timestamp={message.TimeStamp}
								username={message.UserName}
								key={id}
							/>
						))}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Event;
