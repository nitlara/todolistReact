import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "react-bootstrap/InputGroup";
import "bootstrap";

export const ToDoContainer = props => {
	const [task, setTask] = useState("");

	return (
		<Form>
			<div className="todo-list">
				<div className="file-input">
					<Input
						type="text"
						className="text"
						value={task}
						onChange={e => setTask(e.target.value)}
					/>
					<Button className="button">Add</Button>
				</div>
			</div>
		</Form>
	);
};
