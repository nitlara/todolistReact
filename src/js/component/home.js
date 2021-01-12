import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { ToDoContainer } from "./todocontainer";

//create your first component
export function Home() {
	return (
		<div className="container">
			<h1>todos</h1>
			<div className="card border-light">
				<div className="container">
					<ToDoContainer />
					{/* <ToDoList /> */}
					{/* <taskCounter /> */}
				</div>
				<div className="paper" />
			</div>
		</div>
	);
}
