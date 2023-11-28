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

export { httpFetchCommunities };
