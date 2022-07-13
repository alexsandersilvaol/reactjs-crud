import { BrowserRouter, Route, Routes } from "react-router-dom";
import IncluirProduto from "./Components/IncluirProduto";
import EditarProduto from "./Components/EditarProduto";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Home /> }  path="/" exact />
        <Route element={ <IncluirProduto /> }  path="/incluir-produto" />
        <Route element={ <EditarProduto /> }  path="/editar-produto/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
