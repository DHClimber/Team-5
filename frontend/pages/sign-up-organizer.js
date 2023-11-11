import MainHeader from "@/components/LoginSignUpPages/MainHeader";
import RedirectSection from "@/components/LoginSignUpPages/RedirectSection";
import SubHeader from "@/components/LoginSignUpPages/SubHeader";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";

const SignUpOrganizer = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [formValues, setFormValues] = useState({
		first_name: "",
		last_name: "",
		username: "",
		phone_number: "",
		email: "",
		password: "",
		confirm_password: "",
		organizer_key: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);
		try {
			let result = await httpUserSignIn(formValues.email, formValues.password);
			setFormValues({
				email: "",
				password: "",
			});
			console.log("Result on login page: ");
			console.log(await result);
			console.log(await result.status);
			setLoading(false);
			if (result?.email) {
				// router.push("/home");
				console.log("SUCCESS!");
			} else {
				setError(true);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
			setError(true);
		}
	};
	return (
		<main className="flex flex-row h-screen">
			<div className="register-left-half-div">
				<MainHeader />
				<SubHeader />
				<RedirectSection
					first_title={"Looking to sign in?"}
					first_link={"/"}
					first_button={"Sign In"}
					second_title={"Want to be a new volunteer?"}
					second_link={"/sign-up"}
					second_button={"Register Now"}
				/>
			</div>
			<div className="register-right-half-div">
				{/* Organizer Registration Form */}
				<div className="form-container-styles">
					<h2 className="form-header-styles">Register as an Organizer</h2>
					<form className="form-styles">
						<div className="flex flex-row items-center space-x-4">
							<div className="flex flex-col">
								<label className="text-lg">First Name:</label>
								<input
									className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
									name="first_name"
									type="text"
									pattern="[a-zA-Z]+"
									value={formValues.first_name}
									onChange={handleInputChange}
								/>
							</div>
							<div className="flex flex-col">
								<label className="text-lg">Last Name:</label>
								<input
									className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
									name="last_name"
									type="text"
									pattern="[a-zA-Z]+"
									value={formValues.last_name}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<label className="text-lg pt-1">Username:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="username"
							type="text"
							pattern="[a-zA-Z0-9._-]+"
							value={formValues.username}
							onChange={handleInputChange}
						/>
						<label className="text-lg pt-1">Phone Number:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="phone_number"
							type="tel"
							pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
							value={formValues.phone_number}
							onChange={handleInputChange}
						/>
						<label className="text-lg pt-1">Email:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="email"
							type="email"
							value={formValues.email}
							onChange={handleInputChange}
						/>

						<label className="mt-4 text-lg pt-1">Password:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="password"
							type="password"
							value={formValues.password}
							onChange={handleInputChange}
						/>
						<label className="text-lg pt-1">Confirm Password:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="confirm_password"
							type="password"
							value={formValues.confirm_password}
							onChange={handleInputChange}
						/>
						<div className="section-border " />
						<label className="text-lg pt-1">Organizer Key:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="organizer_key"
							type="text"
							value={formValues.organizer_key}
							onChange={handleInputChange}
						/>
						<button
							className="primary-button-red w-full mt-12 transition-all"
							onClick={(event) => handleSubmit(event)}
						>
							Register
						</button>
					</form>
					<div className="flex flex-row justify-center">
						<BarLoader
							className="mt-4"
							color={"#fff"}
							loading={loading}
							size={150}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SignUpOrganizer;
