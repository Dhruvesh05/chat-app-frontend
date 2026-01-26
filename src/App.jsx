import React from "react";
import "./App.css";

// AppRoutes handles all navigation and page rendering
import AppRoutes from "./config/Routes.jsx";

const App = () => {
	return (
		<div className="app-root">
			<AppRoutes />
		</div>
	);
};

export default App;
