import CommunityCard from "@/components/CommunityLists/CommunityCard";
import Header from "@/components/Header";
import { httpRefreshAccessToken, returnAdminStatus } from "@/utils/auth";
import { httpFetchCommunities } from "@/utils/requests";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrganizerHome = () => {
	const [communities, setCommunities] = useState([]);
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		const fetchData = async (fetched) => {
			try {
				const response = await httpFetchCommunities();

				if (response.ok) {
					fetched = true;
					console.log(response);
					const response_json = await response.json();
					console.log(response_json);
					setCommunities(response_json);
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
		fetchData(fetched);
	}, []);

	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div className="flex flex-row w-full justify-center ">
				<div className="flex flex-col w-full px-32 py-8 ">
					<div className="flex flex-row justify-between border-b pb-2 items-center">
						<h2 className="secondary-font text-4xl">Communities</h2>
						{admin && (
							<Link href="organizer/create-community">
								<button className="primary-button secondary-font">
									Create New Community
								</button>
							</Link>
						)}
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
						{communities.length >= 0 &&
							communities.map((community, id) => {
								const communityNameURL = encodeURIComponent(
									community.community_name
								);
								const communityID = encodeURIComponent(community.id);
								return (
									<Link
										href={`/community/community-page?communityname=${communityNameURL}&communityID=${communityID}`}
										key={id}
									>
										<CommunityCard
											community_name={community.community_name}
											city={community.city}
											state={community.state}
											first_name={community.admin.first_name}
											last_name={community.admin.last_name}
											email={community.admin.email}
											phone={community.admin.phone}
										/>
									</Link>
								);
							})}
					</div>
				</div>
			</div>
		</main>
	);
};

export default OrganizerHome;
