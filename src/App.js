import React from "react";
import { Provider } from "react-redux";
import Main from "./components/Navigation";
import store from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
