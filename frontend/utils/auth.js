const API_URL = "http://localhost:8000";

async function httpUserSignIn(email, password) {
	const data = {
		email: email,
		password: password,
	};

	try {
		const response = await fetch(`${API_URL}/auth/login/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const responseData = await response.json();
			const tokensJsonString = responseData.tokens.replace(/'/g, '"');
			const tokens = JSON.parse(tokensJsonString);
			console.log(tokens);
			localStorage.setItem("access_token", tokens.access);
			localStorage.setItem("refresh_token", tokens.refresh);

			return responseData;
		} else {
			throw new Error("Failed to login");
		}
	} catch (error) {
		return error;
	}
}

async function httpOrganizerSignIn(email, password) {
	const data = {
		email: email,
		password: password,
	};

	try {
		const response = await fetch(`${API_URL}/auth/organizer-login/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			const responseData = await response.json();
			const tokensJsonString = responseData.tokens.replace(/'/g, '"');
			const tokens = JSON.parse(tokensJsonString);
			console.log(tokens);
			localStorage.setItem("access_token", tokens.access);
			localStorage.setItem("refresh_token", tokens.refresh);
			localStorage.setItem("is_admin", true);

			return responseData;
		} else {
			throw new Error("Failed to login");
		}
	} catch (error) {
		return error;
	}
}

async function httpPasswordReset(email) {
	const data = {
		email: email,
	};

	try {
		// I need to change this url I believe
		const response = await fetch(`${API_URL}/mail_serv/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			return response;
		} else {
			throw new Error("Failed to reset password");
		}
	} catch (error) {
		return error;
	}
}

async function httpUserRegister(
	email,
	username,
	password,
	first_name,
	last_name,
	phone_number
) {
	const data = {
		email: email,
		username: username,
		password: password,
		first_name: first_name,
		last_name: last_name,
		phone_number: phone_number,
	};

	try {
		const response = await fetch(`${API_URL}/auth/register/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			return response;
		} else {
			console.log(response);
			throw new Error("Failed to register user");
		}
	} catch (error) {
		console.log(error); // Log the full error object for debugging

		let responseBody;
		try {
			responseBody = await error.json(); // Try to parse the response body as JSON
		} catch (jsonError) {
			console.log("Error parsing response body as JSON:", jsonError);
			responseBody = await error.text(); // If parsing fails, get the response body as text
		}

		console.log(responseBody); // Log the parsed response body or text
		return error;
	}
}

async function httpOrganizerRegister(
	email,
	username,
	password,
	first_name,
	last_name,
	phone_number,
	sign_up_password
) {
	const data = {
		email: email,
		username: username,
		password: password,
		first_name: first_name,
		last_name: last_name,
		phone_number: phone_number,
		sign_up_password: sign_up_password,
	};

	try {
		const response = await fetch(`${API_URL}/auth/organizer-register/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			return response;
		} else {
			throw new Error("Failed to register user");
		}
	} catch (error) {
		return error;
	}
}

async function httpRefreshAccessToken() {
	const refresh_token = localStorage.getItem("refresh_token");
	console.log(refresh_token);

	const data = {
		refresh: refresh_token,
	};

	try {
		const response = await fetch(`${API_URL}/auth/refresh/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			response_json = response.json();
			access = response_json.access;
			localStorage.setItem("access_token", access);
		} else {
			console.log("error");
			console.log(response.json());
		}
	} catch (error) {}
}

export {
	httpUserSignIn,
	httpPasswordReset,
	httpOrganizerSignIn,
	httpUserRegister,
	httpOrganizerRegister,
	httpRefreshAccessToken,
};
