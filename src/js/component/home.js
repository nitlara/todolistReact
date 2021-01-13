import React from "react";

import { ToDoContainer } from "./todocontainer";
//import { TaskCounter } from "./taskcounter";
import "../../styles/todocontainer.scss";

//create your first component
export function Home() {
	return (
		<div className="container">
			<h1>todos</h1>
			<div className="card border-light">
				<ToDoContainer />
				{/* <ToDoList /> */}
				{/* <TaskCounter /> */}
				<div className="paper" />
			</div>
		</div>
	);
}
