import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Extention } from "./components/extension/extension";
import { FullRecipe } from "./components/fullRecipe/fullRecipe";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/full" element={<FullRecipe />} />
        </Routes>
      </BrowserRouter>
      {window.location.pathname !== "/full" && <Extention />}
    </>
  );
}

export default App;
