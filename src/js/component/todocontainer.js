import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

import "../../styles/todocontainer.scss";
import "bootstrap";

export const ToDoContainer = () => {
	const [task, setTask] = useState("");

	//Array para "depositar" las tareas, hay que hacer 1) .map, para añadir al array,
	//2).unshift/.splice/ para añadir al ppio
	//3).splice o .slice para eliminar?? hay que indicar posicion a eliminar con el index

	const [arrayTasks, setArrayTasks] = useState([]);

	useEffect(function() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alesanchezr")
			.then(response => response.json()) // convert to json
			.then(data => {
				setArrayTasks(data);
			})
			.catch(err => console.log("Request Failed", err)); // Catch errors
	}, []);

	//Funcion creacion de array con "task", e Input a "blank".
	const handleKeyPress = event => {
		event.preventDefault();
		setArrayTasks([task, ...arrayTasks]);
		setTask("");
	};
	var resultArray = [];

	const removeElement = index => {
		resultArray = arrayTasks;

		resultArray.splice(index, 1);

		setArrayTasks([...resultArray]);
	};

	const listOfTasks = arrayTasks.map((element, index) => {
		return (
			<li key={index}>
				{" "}
				{element.label}{" "}
				<div
					className="icondelete"
					onClick={() => removeElement(index)}>
					<i className="fas fa-times" />
				</div>
			</li>
		);
	});

	return (
		<div className="form-container">
			<Form onSubmit={event => handleKeyPress(event)}>
				<Form.Group controlId="formTask">
					<Form.Control
						type="text"
						placeholder="Write your next task here"
						value={task}
						onChange={e => setTask(e.target.value)}
					/>
				</Form.Group>
			</Form>

			<ul className="table"> {listOfTasks} </ul>
			<div>
				<p className="task-counter"> {arrayTasks.length} items left </p>
			</div>
		</div>
	);
};
