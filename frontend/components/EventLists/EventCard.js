import React from "react";

const EventCard = () => {
	{
		/* event_name, event_organizer, community, date start, date end, time start, time end */
	}
	return (
		<div
			className="flex flex-col bg-white items-center p-4 
        rounded-xl drop-shadow-lg hover:bg-red-100 transition-all hover:cursor-pointer"
		>
			<h3 className="primary-font text-3xl text-color-main">EVENT NAME HERE</h3>
			<div className="flex flex-col w-full secondary-font px-4">
				<p className="text-xl mb-2 py-2">Location</p>
				<div className="flex flex-row w-full justify-between">
					<div className="flex flex-col text-sm">
						<p className="border-b border-neutral-300">Dates</p>
						<div className="flex flex-row justify-between">
							<p>Start:</p>
							<p className="ml-4">10/30/2023</p>
						</div>
						<div className="flex flex-row justify-between">
							<p>End:</p>
							<p>10/30/2023</p>
						</div>
					</div>
					<div className="flex flex-col text-sm">
						<p className="border-b border-neutral-300">Times</p>
						<div className="flex flex-row justify-between">
							<p>Start:</p>
							<p className="ml-4">10:00 AM</p>
						</div>
						<div className="flex flex-row justify-between">
							<p>End:</p>
							<p>2:30 PM</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
