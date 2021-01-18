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
	console.log(arrayTasks);
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
		resultArray = [""];
		//resultArray = ["All elements are done"];
		setArrayTasks([...resultArray]);
		modifyList(["All elements are done"]);
		// setArrayTasks(["All elements are done!"]);
		//modifyList(["All elements are done!"]); ////////////////////////////ESTO NO HACE UN PUT VACIO
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
		//tener preparado un put, un delete+post, put con mensaje a 0
		console.log(arrayTasks, "Hello!! estoy haciendo modifyList");
		fetch("https://assets.breatheco.de/apis/fake/todos/user/nitlara", {
			method: "PUT",
			body: JSON.stringify(arrayTasks),
			headers: { "Content-type": "application/json" }
		})
			.then(response => response.json()) // convert to json
			.then(data => {
				console.log("data");
				console.log(data);
				console.log("array tareas");
				console.log(arrayTasks);
			})
			.catch(err => {
				console.log("Request Failed", err);
			}); // Catch errors
	};

	const deleteList = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify({ label: "All tasks are done", done: false });

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/nitlara",
			requestOptions
		)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};
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
