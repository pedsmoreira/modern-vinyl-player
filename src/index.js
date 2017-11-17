import { useStrict } from "mobx";
import React from "react";
import ReactDOM from "react-dom";

import { api } from "premiere";

import App from "./App";
// import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

useStrict();
// api.base = 'https://premiere-player-api.herokuapp.com';
api.base = "http://localhost:8000";

ReactDOM.render(<App />, document.getElementById("root"));

// registerServiceWorker();
