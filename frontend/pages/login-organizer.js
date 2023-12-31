import MainHeader from "@/components/LoginSignUpPages/MainHeader";
import RedirectSection from "@/components/LoginSignUpPages/RedirectSection";
import SubHeader from "@/components/LoginSignUpPages/SubHeader";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { httpOrganizerSignIn } from "@/utils/auth";

const LoginOrganizer = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
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
			let result = await httpOrganizerSignIn(
				formValues.email,
				formValues.password
			);
			setFormValues({
				email: "",
				password: "",
			});
			console.log("Result on login page: ");
			console.log(await result);
			console.log(await result.status);
			setLoading(false);
			if (result?.email) {
				router.push("/home");
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
			{/*Abstract away login form and components on main page to make this page easier to create*/}

			<div className="register-left-half-div">
				<MainHeader />
				<SubHeader />
				<RedirectSection
					first_title={"Looking to volunteer?"}
					first_link={"sign-up"}
					first_button={"Register Now"}
					second_title={"Want to be a new organizer?"}
					second_link={"sign-up-organizer"}
					second_button={"Register Now"}
				/>
			</div>
			<div className="register-right-half-div">
				{/* Organizer Login Form */}
				<div className="flex flex-col  bg-[#ff6464] p-8 rounded-lg drop-shadow-md text-white secondary-font w-96">
					<h2 className="text-3xl primary-font pb-4">Organizer Log In</h2>
					<form className="flex flex-col">
						<label className="text-lg">Email:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="email"
							type="email"
							value={formValues.email}
							onChange={handleInputChange}
						/>

						<label className="mt-4 text-lg">Password:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="password"
							type="password"
							value={formValues.password}
							onChange={handleInputChange}
						/>
						<button
							className="primary-button-red w-full mt-12 transition-all"
							onClick={(event) => handleSubmit(event)}
						>
							Login
						</button>
						<div className="flex flex-row justify-end py-1">
							<Link href="/password-reset">
								<button>Forgot Password?</button>
							</Link>
						</div>
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
				<div className="flex flex-row space-x-2 secondary-font pt-2">
					<h6>Looking for volunteer login?</h6>
					<Link href="/login">
						<button className="primary-color-text">Click Here</button>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default LoginOrganizer;
