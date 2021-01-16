import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../styles/todocontainer.scss";
import "bootstrap";
import PropTypes from "prop-types";

export let ToDoContainer = () => {
	//UseState de tareas y el cambio de tareas
	let [task, setTask] = useState("");
	//UseState del array de tareas que necesitamos para visualizar y contar.
	let [arrayTasks, setArrayTasks] = useState([]);

	//FETCH --> GET --> Get devuelve a (data) los datos que descarga de API con este usuario y los manda a setArrayTasks
	// setArrayTasks actualiza (useState) el array de tareas.
	useEffect(function() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/nitlara")
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
	//ELIMINACION DE ELEMENTOS
	const removeElement = index => {
		resultArray = arrayTasks;
		resultArray.splice(index, 1);
		setArrayTasks([...resultArray]);
	};

	//Elimina todos los elementos visibles
	const removeAllElements = index => {
		resultArray = arrayTasks;
		resultArray = [];
		setArrayTasks([...resultArray]);
	};

	//map para recorrer el array
	const listOfTasks = arrayTasks.map((element, index) => {
		return (
			<li key={index}>
				{element.label}
				<div
					className="icondelete"
					onClick={() => removeElement(index)}>
					<i className="fas fa-times" />
				</div>
			</li>
		);
	});

	useEffect(
		function(element) {
			if (task != "") {
				//Si el input de tarea no viene vacío
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/nitlara",
					{
						method: "PUT",
						body: JSON.stringify(listOfTasks),
						headers: { "Content-type": "application/json" }
					}
				)
					.then(response => response.json()) // convert to json
					.then(data => {
						setArrayTasks(listOfTasks); //Mandará a la API como datos actualizar DATA con el Array de tareas
					})
					.catch(err => {
						console.log("Request Failed", err);
					}); // Catch errors
			}
		},
		[arrayTasks] //No muestra los elementos nuevos, aunque si genera el div porque se muestra la cruz.
		//Si mandas task (que seria el input ) entra en loop
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
					<div
						className="icondelete mt-1 ml-2"
						onClick={() => removeAllElements()}>
						<i className="fas fa-times" />
					</div>
				</div>
			</div>
		</div>
	);
};
