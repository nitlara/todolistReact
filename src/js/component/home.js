import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
export function Home() {
	return (
		<div className="text-center mt-5">
			<h1>todos</h1>
			<a href="#" className="btn btn-success">
				If you see this green button... bootstrap is working
			</a>
		</div>
	);
}
