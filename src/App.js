import "./App.scss";
import { RouterProvider } from "react-router-dom";
import React from "react";
import axios from "axios";
import router from "./routes";

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;


function App() {
	return (
		<div className={"App"}>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
