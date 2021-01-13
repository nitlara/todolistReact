import React from "react";
import ToDoContainer from "./todocontainer";
import "../../styles/todocontainer.scss";
import "bootstrap";

export const TaskCounter = () => {
	return (
		<div>
			<p className="task-counter"> {arrayTasks.length} items left </p>
		</div>
	);
};
