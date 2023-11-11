import MainHeader from "@/components/LoginSignUpPages/MainHeader";
import RedirectSection from "@/components/LoginSignUpPages/RedirectSection";
import SubHeader from "@/components/LoginSignUpPages/SubHeader";
import { httpUserSignIn } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";

const Login = () => {
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
		<div className="flex flex-row h-screen ">
			<div className="flex flex-col bg-[#ff6464] w-[50%] items-center landing-box-shadow">
				<MainHeader />
				<SubHeader />
				<RedirectSection
					first_title={"Looking to volunteer?"}
					first_link={"/sign-up"}
					first_button={"Register Now"}
					second_title={"Want to be a new organizer?"}
					second_link={"/sign-up-organizer"}
					second_button={"Register Now"}
				/>
			</div>
			<div className="flex flex-col w-[50%] items-center justify-center">
				{/*Login Form Here*/}
				<div className="flex flex-col  bg-[#ff6464] p-8 rounded-lg drop-shadow-md text-white secondary-font">
					<h2 className="text-3xl primary-font pb-4">Log In</h2>
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
					<h6>Looking for organizer login?</h6>
					<Link href="/login-organizer">
						<button className="primary-color-text">Click Here</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
