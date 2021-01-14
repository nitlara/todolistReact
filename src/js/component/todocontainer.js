import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import "../../styles/todocontainer.scss";
import "bootstrap";

export const ToDoContainer = () => {
	//UseState de tareas y el cambio de tareas
	const [task, setTask] = useState("");
	//UseState del array de tareas que necesitamos para visualizar y contar.
	const [arrayTasks, setArrayTasks] = useState([]);

	//Evento (pulsar enter) que nos permite guardar array
	const handleKeyPress = event => {
		event.preventDefault();
		//desestructuración:La sintaxis de desestructuración es una expresión de JavaScript que
		//permite desempacar valores de arreglos o propiedades de objetos en distintas variables.
		setArrayTasks([task, ...arrayTasks]);
		setTask("");
	};
	var resultArray = [];
	//función para eliminar elementos
	const removeElement = index => {
		resultArray = arrayTasks;
		resultArray.splice(index, 1);
		setArrayTasks([...resultArray]);
	};
	//map para recorrer el array
	const listOfTasks = arrayTasks.map((element, index) => {
		return (
			<li key={index}>
				{" "}
				{element}{" "}
				<div
					className="icondelete"
					onClick={() => removeElement(index)}>
					<i className="fas fa-times" />
				</div>
			</li>
		);
	});
	//formulario
	//incluye un onChange
	//Genera la lista de tareas que viene dada del map de arrayTasks
	//Cuenta el length del array
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
