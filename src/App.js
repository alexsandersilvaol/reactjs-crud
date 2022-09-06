import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import IncluirProduto from "./Components/IncluirProduto";
import EditarProduto from "./Components/EditarProduto";
import IncluirUsuario from "./Components/IncluirUsuario";
import LoginUsuario from "./Components/LoginUsuario";
import Home from "./Components/Home";
import { isAuthenticated } from "./Services/auth";
import { ToastContainer } from 'react-toastify';

//FakeServer();

const PrivateRoute = ({ component }) => {
  return isAuthenticated() ? component : <Navigate to="/" />;
}


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={ <Home /> }  path="/" exact />
          <Route element={ <IncluirProduto /> }  path="/incluir-produto" />
          <Route element={ <EditarProduto /> } path="/editar-produto/:id" />
          <Route element={ <IncluirUsuario /> }  path="/incluir-usuario" />
          <Route element={ <LoginUsuario /> }  path="/login" />
          <Route path="*" component={() => <h1>Ops!</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
