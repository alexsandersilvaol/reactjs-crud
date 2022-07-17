import { BrowserRouter, Route, Routes } from "react-router-dom";
import IncluirProduto from "./Components/IncluirProduto";
import EditarProduto from "./Components/EditarProduto";
import Home from "./Components/Home";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    produtos: Model,
  },

  // seeds(server) {
  //   server.create('produtos', [{ id: 1, nome: 'Iphone', valor: 9000 }]);
  // },

  routes() {
    this.namespace = "api"

    this.get("/produtos", (schema) => {
      return schema.produtos.all()
    });

    this.get("/produtos/:id", (schema, request) => {
      const id = request.params.id;
      return schema.produtos.find(id);
    });

    this.post("/produtos", (schema, request) => {
      const produto = JSON.parse(request.requestBody);
      return schema.produtos.create( produto );
    });

    this.put("/produtos/:id", (schema, request) => {
      const id = request.params.id;
      const produto = JSON.parse(request.requestBody);
      return schema.produtos.find( id ).update(produto);
    });

    this.del("/produtos/:id", (schema, request) => {
      const id = request.params.id;
      return schema.produtos.find( id ).destroy();
    });
  },
});

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
