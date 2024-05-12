import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import {store} from "./app/reduxPersistConfig.js"
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/reduxPersistConfig.js"; // Import the persistor

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      ,
    </PersistGate>
  </Provider>
);
