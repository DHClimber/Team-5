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

async function httpPasswordReset(email) {
	const data = {
		email: email,
	};

	try {
		const response = await fetch(`${API_URL}/mail_serv/`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (response.ok) {
			return responseData;
		} else {
			throw new Error("Failed to reset password");
		}
	} catch (error) {
		return error;
	}
}

export { httpUserSignIn, httpPasswordReset };
