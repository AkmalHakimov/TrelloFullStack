import React from "react";
import Trello from "./components/trello/index"
import { Route,Routes,Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
function App() {
  
  
  return (
    <div >
      <Routes>
        <Route path={"/trello"} element={<Trello />} />
      </Routes>
    </div>
  );
}

export default App;
