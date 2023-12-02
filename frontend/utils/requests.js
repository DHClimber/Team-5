const API_URL = "http://localhost:8000";

async function httpFetchCommunities() {
	const token = localStorage.getItem("access_token");
	console.log(`token: ${token}`);

	try {
		const response = await fetch(`${API_URL}/event/community/`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		return response;
	} catch (error) {
		console.log(error);
	}
}

async function httpCreateCommunity(community_name, city, state) {
	const token = localStorage.getItem("access_token");
	const data = {
		community_name: community_name,
		city: city,
		state: state,
	};
	console.log(data);

	try {
		const response = await fetch(`${API_URL}/event/community/`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		console.log(response);

		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function httpFetchStates() {
	try {
		const response = await fetch(`${API_URL}/event/community/events/states/`);

		return response.json();
	} catch (error) {
		console.log(error);
	}
}
export { httpFetchCommunities, httpCreateCommunity, httpFetchStates };
