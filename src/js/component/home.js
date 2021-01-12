import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { ToDoContainer } from "./todocointainer";

//create your first component
export function Home() {
	return (
		<div className="container">
			<div>
				<h1>TODO</h1>
			</div>
			<div className="container">
				<ToDoContainer />
			</div>
		</div>
	);
}
