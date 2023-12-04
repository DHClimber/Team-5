import Header from "@/components/Header";
import { httpRefreshAccessToken } from "@/utils/auth";
import { httpUploadEventFile } from "@/utils/requests";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BarLoader } from "react-spinners";

const UploadFile = () => {
	const router = useRouter();
	const { eventname, eventID } = router.query;
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		let response = await httpUploadEventFile(file);

		if (!response.ok) {
			await httpRefreshAccessToken();
			response = await httpUploadEventFile(file);
		}

		if (response.ok) {
			console.log(response.json());
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
					<h2 className="border-b primary-font text-3xl mb-4">Upload File</h2>
					<div className="flex flex-col secondary-font items-start ">
						<input
							type="file"
							onChange={handleInputChange}
							accept=".pdf, .jpg, .png"
							className=""
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

export default UploadFile;
