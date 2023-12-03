import Header from "@/components/Header";
import { httpCreateEvent, httpFetchStates } from "@/utils/requests";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const AddEvent = () => {
	const router = useRouter();
	const { communityID } = router.query;

	const [loading, setLoading] = useState(false);
	const [stateDropdown, setStateDropdown] = useState({});
	const [formValues, setFormValues] = useState({
		event_name: "",
		street_address: "",
		city: "",
		state: "AL",
		zipcode: "",
		building_number: "",
		start_date: "",
		end_date: "",
		start_time: "",
		end_time: "",
		community_id: communityID,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	useEffect(() => {
		const getStates = async () => {
			try {
				const states = await httpFetchStates();
				setStateDropdown(states);
				console.log(states);
			} catch (error) {
				console.log(error);
			}
		};

		getStates();
	}, []);

	/* NEED FORM SUBMISSION FUNCTION ONCE BACKEND VIEW IS BUILT */
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		console.log(formValues);
		let response = await httpCreateEvent(formValues);

		if (response === false) {
			await httpRefreshAccessToken();
			response = await httpCreateEvent(formValues);
		}

		if (response.ok) {
			console.log("posted");
			router.push("/organizer-home");
		} else {
			console.log(response.json());
		}
		setLoading(false);
	};

	return (
		<main className="main-flex-col">
			<Header />
			<div className="flex flex-row justify-center">
				<form
					className="flex flex-col primary-color drop-shadow-lg 
                rounded-lg p-8 mt-12 text-white"
					onSubmit={handleSubmit}
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
						<label className="text-lg">Street Address:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="street_address"
							type="text"
							pattern="[a-zA-Z0-9\s:]+"
							value={formValues.street_address}
							onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-row justify-between space-x-8">
						<div className="flex flex-col secondary-font">
							<label className="text-lg">City:</label>
							<input
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="city"
								type="text"
								pattern="[a-zA-Z]+"
								value={formValues.city}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col secondary-font">
							<label className="text-lg">State:</label>
							<select
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="state"
								value={formValues.state}
								onChange={handleInputChange}
							>
								{stateDropdown.states?.map((item, i) => (
									<option value={item[0]} key={i}>
										{item[1]}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="flex flex-row secondary-font space-x-8">
						<div className="flex flex-col">
							<label className="text-lg">Zip Code</label>
							<input
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="zipcode"
								type="numeric"
								pattern="[0-9]+"
								value={formValues.zipcode}
								onChange={handleInputChange}
							/>
						</div>
						<div className="flex flex-col">
							<label className="text-lg">Building Number (if necessary):</label>
							<input
								className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
								name="building_number"
								type="text"
								pattern="[a-zA-Z]+"
								value={formValues.building_number}
								onChange={handleInputChange}
							/>
						</div>
					</div>
					<div className="flex flex-row secondary-font justify-between space-x-8">
						<div className="flex flex-col w-full">
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
						<div className="flex flex-col w-full">
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
