import MainHeader from "@/components/LoginSignUpPages/MainHeader";
import RedirectSection from "@/components/LoginSignUpPages/RedirectSection";
import SubHeader from "@/components/LoginSignUpPages/SubHeader";
import { httpPasswordReset } from "@/utils/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";

const PasswordReset = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [formValues, setFormValues] = useState({
		email: "",
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
			let result = await httpPasswordReset(formValues.email);
			setFormValues({
				email: "",
				password: "",
			});
			console.log("Result on login page: ");
			console.log(await result);
			console.log(await result.status);
			setLoading(false);
			if (result?.email) {
				router.push("/login");
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
		<main className="main-flex-row">
			<div className="register-left-half-div">
				<MainHeader />
				<SubHeader />
				<RedirectSection
					first_title={"Looking to sign in?"}
					first_link={"/login"}
					first_button={"Sign In "}
					second_title={"Want to be a new volunteer?"}
					second_link={"/sign-up"}
					second_button={"Register Now"}
				/>
			</div>
			<div className="register-right-half-div">
				{/*Password Reset Form Here*/}
				<div className="login-and-password-reset-forms">
					<h2 className="form-header-styles mr-12">Reset Password</h2>
					<form className="flex flex-col">
						<label className="text-lg">Email:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="email"
							type="email"
							value={formValues.email}
							onChange={handleInputChange}
						/>
						<button
							className="primary-button-red w-full mt-12 transition-all"
							onClick={(event) => handleSubmit(event)}
						>
							Reset Password
						</button>
						{/* DISPLAY ANY ERRORS FROM API RESPONSE HERE */}
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

export default PasswordReset;
