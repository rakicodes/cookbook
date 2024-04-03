import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import store from "./app/store";
import App from "./ui/App";
import ErrorPageTemplate from "./ui/templates/ErrorPageTemplate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={<ErrorPageTemplate message="Sorry something went wrong" />}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
