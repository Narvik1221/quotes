// @ts-nocheck
import  { createContext } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import Store from "./store/Store";
export const Context = createContext([]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Context.Provider
    value={{
      quotes: new Store(),
    }}
  >
    <App />
  </Context.Provider>
);
