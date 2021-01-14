import React from "react";
import "../../styles/footercounter.scss";
import "bootstrap";

export const TaskCounter = () => {
	return (
		<div>
			<p className="task-counter"> {arrayTasks.length} items left </p>
		</div>
	);
};
