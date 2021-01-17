import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

import "../../styles/todocontainer.scss";
import "bootstrap";

export const ToDoContainer = () => {
	//UseState de tareas y el cambio de tareas
	const [task, setTask] = useState("");
	//UseState del array de tareas que necesitamos para visualizar y contar.
	const [arrayTasks, setArrayTasks] = useState([]);

	//FETCH --> GET

	useEffect(function() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/agarzon")
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
	// 	fetch("https://assets.breatheco.de/apis/fake/todos/user/agarzon", {
	// 		method: "POST",
	// 		body: JSON.stringify(arrayTasks),
	// 		headers: { "Content-type": "application/json" }
	// 	})
	// 		.then(response => response.json()) // convert to json
	// 		.then(data => {
	// 			setArrayTasks(arrayTasks);
	// 		})
	// 		.catch(err => {
	// 			console.log("Request Failed", err);
	// 		}); // Catch errors
	// };
	var resultArray = [];
	//ELIMINACION DE ELEMENTOS
	const removeElement = index => {
		resultArray = arrayTasks;
		resultArray.splice(index, 1);
		setArrayTasks([...resultArray]);
	};

	//map para recorrer el array
	const listOfTasks = arrayTasks.map((e, index) => {
		return (
			<li key={index}>
				{e.label}
				<div
					className="icondelete"
					onClick={() => removeElement(index)}>
					<i className="fas fa-times" />
				</div>
			</li>
		);
	});

	useEffect(
		function() {
			if (task != "") {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/agarzon",
					{
						method: "PUT",
						body: JSON.stringify(arrayTasks),
						headers: { "Content-type": "application/json" }
					}
				)
					.then(response => response.json()) // convert to json
					.then(data => {
						setArrayTasks(arrayTasks);
					})
					.catch(err => {
						console.log("Request Failed", err);
					}); // Catch errors
			}
		},
		[setArrayTasks]
	);

	//formulario
	//incluye un onChange
	//Genera la lista de tareas que viene dada del map de arrayTasks
	//Cuenta el length del array
	//!!!!!!-------------PENDIENTE: Añadir el condicional al segundo icondelete para que no aparezca si el length no es mayor a 0-------------!!!!!!

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
			<div className="d-flex flex-row justify-content-between">
				<p className="task-counter"> {arrayTasks.length} items left </p>
				<div className="removeall d-flex mr-4">
					<p className="textremove"> Remove all </p>
					<div className="icondelete mt-1 ml-2">
						<i className="fas fa-times" />
					</div>
				</div>
			</div>
		</div>
	);
};
