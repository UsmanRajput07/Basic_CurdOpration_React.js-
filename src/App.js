import { BrowserRouter, Route, Routes } from "react-router-dom";
import Student from "./Pages/Student";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
