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
		var taskElement = { label: task, done: false };
		setArrayTasks([taskElement, ...arrayTasks]);
		modifyList([taskElement, ...arrayTasks]);
		setTask("");
	};
	var resultArray = [];
	//ELIMINACION DE ELEMENTOS
	const removeElement = index => {
		resultArray = arrayTasks;
		resultArray.splice(index, 1);
		setArrayTasks([...resultArray]);
		modifyList([...resultArray]);
	};

	//Elimina todos los elementos visibles
	const removeAllElements = index => {
		setArrayTasks([]);
		modifyList([]);
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

	const modifyList = () => {
		console.log(arrayTasks, "Hello!!");
		fetch("https://assets.breatheco.de/apis/fake/todos/user/agarzon", {
			method: "PUT",
			body: JSON.stringify(arrayTasks),
			headers: { "Content-type": "application/json" }
		})
			.then(response => response.json()) // convert to json
			.then(data => {
				console.log(data);
			})
			.catch(err => {
				console.log("Request Failed", err);
			}); // Catch errors
	};

	// // useEffect(
	// 	function modifyList() {
	// 		if (task != "") {
	// 			//Si el input de tarea no viene vacío
	// 			fetch(
	// 				"https://assets.breatheco.de/apis/fake/todos/user/agarzon",
	// 				{
	// 					method: "PUT",
	// 					body: JSON.stringify(arrayTasks),
	// 					headers: { "Content-type": "application/json" }
	// 				}
	// 			)
	// 				.then(response => response.json()) // convert to json
	// 				.then(data => {
	// 					console.log(data);
	// 				})
	// 				.then(allRemove => {
	// 					removeAllElements(); //Envío de la eliminación de todos los archivos a la API???
	// 				})
	// 				.then(singleTaskremove => {
	// 					removeElement(); //Envío de la eliminación de una unica tarea a la API???
	// 				}) //Hay que hacer llegar cualquier eliminacion a la API, ¿se incluyen ambas funciones en el PUT?
	// 				.catch(err => {
	// 					console.log("Request Failed", err);
	// 				}); // Catch errors
	// 		}
	// 		modifyList();
	// 	},
	// 	[arrayTasks]

	// 	//No muestra los elementos nuevos, aunque si genera el div porque se muestra la cruz.
	// 	//ALVARO: con setArrayTasks, mismo efecto, se incluye en div, pero sin el texto.
	// 	//Si mandas task (que seria el input ) entra en loop
	// // );

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
