import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import store from "./Store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}
 

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render( 
<Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}> 
      <App />
    </AlertProvider>
  </Provider>
);
