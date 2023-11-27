import Header from "@/components/Header";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";

const CreateCommunity = () => {
	{
		/* BEFORE CONNECTING FORM TO BACKEND, WE NEED TO SET UP THE REFRESH TOKEN API, SO ONCE ACCESS
        TOKEN HAS EXPIRED, WE CAN FETCH A NEW ONE 
            logic flow: make request with access token
                if request denied to expired credentials, fetch new access token using refresh token
                update access token in the local storage, then make request again using new token.
        */
	}

	const [loading, setLoading] = useState(false);
	const [formValues, setFormValues] = useState({
		community_name: "",
		city: "",
		state: "",
	});

	return (
		<main className="main-flex-col bg-slate-100">
			<Header />
			<div className="flex flex-row justify-center">
				<form className="flex flex-col primary-color drop-shadow-lg rounded-lg p-8 mt-12 w-96 text-white">
					<h2 className="border-b primary-font text-3xl mb-4">
						Create Community
					</h2>
					<div className="flex flex-col secondary-font">
						<label className="text-lg">Community Name:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="community_name"
							type="text"
							pattern="[a-zA-Z]+"
							//value={formValues.community_name}
							//onChange={handleInputChange}
						/>
					</div>
					<div className="flex flex-col secondary-font">
						<label className="text-lg">City:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="city"
							type="text"
							pattern="[a-zA-Z]+"
							//value={formValues.city}
							//onChange={handleInputChange}
						/>
					</div>
					{/* STATE IS A DROPDOWN LIST ON BACKEND BUT THAT MAY CHANGE 
                    SO LEAVE THIS AS TEXT INPUT FOR NOW */}
					<div className="flex flex-col secondary-font">
						<label className="text-lg">State:</label>
						<input
							className="rounded-md p-2 text-xl text-black drop-shadow-md focus:outline-[#ff6464]"
							name="state"
							type="text"
							pattern="[a-zA-Z]+"
							//value={formValues.state}
							//onChange={handleInputChange}
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

export default CreateCommunity;
