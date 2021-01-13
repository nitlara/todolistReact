import React from "react";

import { ToDoContainer } from "./todocontainer";

//create your first component
export function Home() {
	return (
		<div className="container">
			<h1>todos</h1>
			<div className="card border-light">
				<ToDoContainer />
				{/* <ToDoList /> */}
				{/* <taskCounter /> */}

				<div className="paper" />
			</div>
		</div>
	);
}
