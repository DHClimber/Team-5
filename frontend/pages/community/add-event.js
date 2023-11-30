import Header from "@/components/Header";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";

const AddEvent = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [formValues, setFormValues] = useState({
		event_name: "",
		event_location: "",
		start_date: "",
		end_date: "",
		start_time: "",
		end_time: "",
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	/* NEED FORM SUBMISSION FUNCTION ONCE BACKEND VIEW IS BUILT */

	return (
		<main className="main-flex-col">
			<Header />
			<div className="flex flex-row justify-center">
				<form
					className="flex flex-col primary-color drop-shadow-lg 
                rounded-lg p-8 mt-12 text-white"
				>
					<h2 className="border-b primary-font text-3xl mb-4">Create Event</h2>
					<div className="flex flex-col secondary-font">
						<label className="text-lg">Event Name:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="event_name"
							type="text"
							pattern="[a-zA-Z]+"
							value={formValues.event_name}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col secondary-font">
						<label className="text-lg">Location:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="event_location"
							type="text"
							pattern="[a-zA-Z]+"
							value={formValues.event_location}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col">
						<div className="flex flex-col secondary-font">
							<label className="text-lg">Start Date:</label>
							<input
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="start_date"
								type="date"
								value={formValues.start_date}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col secondary-font">
							<label className="text-lg">End Date:</label>
							<input
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="end_date"
								type="date"
								value={formValues.end_date}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="flex flex-row justify-between space-x-8">
						<div className="flex flex-col secondary-font">
							<label className="text-lg">Start Time:</label>
							<input
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="start_time"
								type="time"
								value={formValues.start_time}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col secondary-font">
							<label className="text-lg">End Time:</label>
							<input
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="end_time"
								type="time"
								value={formValues.end_time}
								onChange={handleInputChange}
							/>
						</div>
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

export default AddEvent;
