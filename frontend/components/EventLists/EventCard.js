import React from "react";
import { format } from "date-fns";

const EventCard = ({
	event_name,
	event_organizer,
	community,
	start_date,
	end_date,
	start_time,
	end_time,
	street_address,
	zipcode,
	city,
	state,
	building_number,
}) => {
	{
		/* event_name, event_organizer, community, date start, date end, time start, time end */
	}

	const formatted_start_date = format(new Date(start_date), "MMM d, yyyy");
	const formatted_end_date = format(new Date(end_date), "MMM d, yyyy");

	const formatted_start_time = format(
		new Date(`2023-11-30T${start_time}`),
		"h:mm a"
	);
	const formatted_end_time = format(
		new Date(`2023-11-30T${end_time}`),
		"h:mm a"
	);
	return (
		<div
			className="flex flex-col bg-white items-center p-4 
        rounded-xl drop-shadow-lg hover:bg-red-100 transition-all hover:cursor-pointer"
		>
			<h3 className="primary-font text-3xl text-color-main">{event_name}</h3>
			<div className="flex flex-col w-full secondary-font px-4">
				<p className="text-xl">
					{street_address}
					{building_number.length > 0 ? (
						<span>
							{", "}
							{building_number}
						</span>
					) : (
						<span></span>
					)}
				</p>
				<p className="text-lg mb-4">
					{city}, {state}, {zipcode}
				</p>
				<div className="flex flex-row w-full justify-between">
					<div className="flex flex-col text-sm">
						<p className="border-b border-neutral-300">Dates</p>
						<div className="flex flex-row justify-between">
							<p>Start:</p>
							<p className="ml-4">{formatted_start_date}</p>
						</div>
						<div className="flex flex-row justify-between">
							<p>End:</p>
							<p>{formatted_end_date}</p>
						</div>
					</div>
					<div className="flex flex-col text-sm">
						<p className="border-b border-neutral-300">Times</p>
						<div className="flex flex-row justify-between">
							<p>Start:</p>
							<p className="ml-4">{formatted_start_time}</p>
						</div>
						<div className="flex flex-row justify-between">
							<p>End:</p>
							<p>{formatted_end_time}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
