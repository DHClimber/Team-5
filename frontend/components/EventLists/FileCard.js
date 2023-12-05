import React from "react";
import { FolderArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { httpFetchFile } from "@/utils/requests";

const FileCard = ({ filepath }) => {
	const handleClick = async () => {
		let response = await httpFetchFile(filepath);

		if (response === false) {
			await httpRefreshAccessToken();
			response = await httpFetchFile(filepath);
		}
	};
	return (
		<div className="flex flex-row space-x-2 border-b pb-2 border-neutral-300">
			<button onClick={handleClick}>
				<FolderArrowDownIcon className="h-8 w-8" />
			</button>
			<p>{filepath}</p>
		</div>
	);
};

export default FileCard;
