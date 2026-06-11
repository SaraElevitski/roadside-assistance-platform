import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/slices/userSlice.ts";
import messageSlice from "./redux/slices/messageSlice.ts";
import { Provider } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";

const myStore = configureStore({
  reducer: combineSlices(userSlice, messageSlice),
});

createRoot(document.getElementById("root")!).render(
  <Provider store={myStore}>
    <StrictMode>
      <BrowserRouter>
        <App></App>
      </BrowserRouter>
    </StrictMode>
  </Provider>,
);
