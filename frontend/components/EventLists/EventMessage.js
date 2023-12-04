import React from "react";
import { format, parse } from "date-fns";

const EventMessage = ({ message, timestamp, username }) => {
	{
		/* message, timestamp, username */
	}

	const formatted_timestamp = parse(
		timestamp,
		"yyyy-MM-dd'T'HH:mm:ss.SSSSSSX",
		new Date()
	);
	const formatted_date = format(formatted_timestamp, "MMM d, yyyy");
	const formatted_time = format(formatted_timestamp, "h:mm a");
	return (
		<div
			className="flex flex-col bg-white items-center p-4 
    rounded-xl drop-shadow-lg"
		>
			<div className="flex flex-row w-full border-b-2 border-neutral-400 justify-center">
				<h3 className="">
					{formatted_date}, {formatted_time}
				</h3>
			</div>
			<div className="flex flex-row p-4 px-8 justify-start w-full text-base">
				<p>
					<span className="text-xl">From {username}: </span>
					{message}
				</p>
			</div>
		</div>
	);
};

export default EventMessage;
