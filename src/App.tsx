import "./App.css";
import { DataView } from "./pages/DataView";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DataView />} />
    </Routes>
  );
}

export default App;
