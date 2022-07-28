import { Model, Server } from "miragejs";

export default function FakeServer() {
    new Server({
      models: {
        produtos: Model,
      },
      
      routes() {
        this.passthrough('http://localhost:3001/api/produtos');
          
        this.namespace = "api";
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
  }