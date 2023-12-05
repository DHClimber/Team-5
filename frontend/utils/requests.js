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

async function httpCreateEvent(formValues) {
	const token = localStorage.getItem("access_token");
	const data = {
		event_name: formValues.event_name,
		street_address: formValues.street_address,
		city: formValues.city,
		state: formValues.state,
		zipcode: formValues.zipcode,
		building_number: formValues.building_number,
		start_date: formValues.start_date,
		end_date: formValues.end_date,
		start_time: `${formValues.start_time}:00`,
		end_time: `${formValues.end_time}:00`,
		community_id: parseInt(formValues.community_id),
	};

	try {
		const response = await fetch(`${API_URL}/event/community/events/`, {
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

async function httpFetchEvents(community_id) {
	const token = localStorage.getItem("access_token");
	console.log(`token: ${token}`);

	try {
		// /http://localhost:8000/event/community/events/?community_id=1
		const response = await fetch(
			`${API_URL}/event/community/events/?community_id=${community_id}`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response;
	} catch (error) {
		console.log(error);
	}
}

async function httpFetchEventMessages(event_id) {
	const token = localStorage.getItem("access_token");

	try {
		const response = await fetch(
			`${API_URL}/forum/event/?event_id=${event_id}`,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response;
	} catch (error) {
		console.log(error);
	}
}

async function httpCreateEventMessage(formData) {
	const token = localStorage.getItem("access_token");
	const data = {
		Message: formData.Message,
		EventId: formData.EventId,
	};

	try {
		const response = await fetch(`${API_URL}/forum/event/post/`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});

		return response;
	} catch (error) {
		console.log(error);
	}
}

async function httpUploadEventFile(file, event_id) {
	const token = localStorage.getItem("access_token");
	const formData = new FormData();
	formData.append("file", file);
	formData.append("event_id", event_id);

	try {
		const response = await fetch(`${API_URL}/file_serv/uploadAPI/`, {
			method: "post",
			body: formData,
		});
		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
}

async function httpGetUploads(event_id) {
	const token = localStorage.getItem("access_token");

	try {
		const response = await fetch(
			`${API_URL}/file_serv/get-files/?event_id=${event_id}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
}

export {
	httpFetchCommunities,
	httpCreateCommunity,
	httpCreateEvent,
	httpFetchStates,
	httpFetchEvents,
	httpFetchEventMessages,
	httpCreateEventMessage,
	httpUploadEventFile,
	httpGetUploads,
};
