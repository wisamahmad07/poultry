import React from "react";
import AreaProfitOutput from "./components/AreaProfitOutput";
import ShowAllOutput from "./components/ShowAllOutput";
import AreaProfitForm from "./components/AreaProfitForm";

const page = async () => {
	return (
		<div className="flex justify-between">
			<AreaProfitForm />
			<AreaProfitOutput />
			<ShowAllOutput />
		</div>
	);
};

export default page;
