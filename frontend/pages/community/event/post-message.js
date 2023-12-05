import Header from "@/components/Header";
import { httpRefreshAccessToken } from "@/utils/auth";
import { httpCreateEvent, httpCreateEventMessage } from "@/utils/requests";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";

const PostMessage = () => {
	const router = useRouter();
	const { eventID, eventname } = router.query;
	const [formValues, setFormValues] = useState({
		EventId: eventID,
		Message: "",
	});
	const [loading, setLoading] = useState(false);

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
		let response = await httpCreateEventMessage(formValues);

		if (!response.ok) {
			await httpRefreshAccessToken();
			response = await httpCreateEventMessage(formValues);
		}

		if (response.ok) {
			console.log("posted");
			router.push(`/community/event?eventname=${eventname}&eventID=${eventID}`);
		} else {
			console.log(response.json());
		}
		setLoading(false);
	};

	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div className="flex flex-row justify-center">
				<form
					className="flex flex-col primary-color drop-shadow-lg 
                    rounded-lg p-8 mt-12 w-[500px] text-white"
					onSubmit={handleSubmit}
				>
					<h2 className="border-b primary-font text-3xl mb-4">
						Post a Message
					</h2>
					<div className="flex flex-col secondary-font">
						<label className="text-lg">Message:</label>
						<textarea
							className="rounded-md p-2 text-base text-black drop-shadow-md focus:outline-[#ff6464] "
							name="Message"
							type="text"
							value={formValues.Message}
							onChange={handleInputChange}
							rows={8}
						/>
					</div>

					<div className="flex flex-row w-full justify-center items-center mt-4">
						<button className="primary-button-red secondary-font">
							Submit
						</button>
					</div>
					<div className="flex flex-row justify-center">
						<BarLoader
							className="mt-4"
							color={"#fff"}
							loading={loading}
							size={150}
						/>
					</div>
				</form>
			</div>
		</main>
	);
};

export default PostMessage;
