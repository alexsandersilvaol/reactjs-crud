import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api";

function EditarProduto () {
    const { id } = useParams();
    const navigate = useNavigate();

    const [idProduto, setIdProduto] = useState(0);
    const [nomeProduto, setNomeProduto] = useState("");
    const [valorProduto, setValorProduto] = useState(0);

    useEffect(() => {
        api.get(`/produtos/${id}`).then(res => {
          const produto = res.data.data;

          setIdProduto(produto.id);
          setNomeProduto(produto.nome);
          setValorProduto(produto.preco);
        });

    }, []);

    function handleAlterarProduto() {
        api.put(`/produtos/${id}`, { 
          id: Number(idProduto),
          nome: nomeProduto, preco:
           valorProduto })
        .then(res => {
            console.log(res);
        });

        navigate('/');
    }


    return (
        <div className="container">
          <div className="titulo-pagina">
            <h1>Incluir Produto</h1>
          </div>

              <form onSubmit={ handleAlterarProduto } >
              <input type="hidden" value={idProduto} />
              <div className="row">
                  <div className="col-md-4">
                    <label >Nome produto</label>
                    <input type="text" className="form-control" id="nomeProduto" value={nomeProduto}
                        placeholder="Digite o nome do produto" onChange={(event) => setNomeProduto(event.target.value) } />
                  </div>
                  <div className="col-md-4">
                    <label>Valor produto</label>
                    <input type="number" className="form-control" id="valorProduto" value={valorProduto}
                      placeholder="Digite o valor do produto" onChange={(event) => setValorProduto(event.target.value) } />
                  </div>
                  <div className="col-md-4 align-self-end">
                    <button type="submit" className="btn btn-sm btn-primary botao-salvar">Salvar</button>
                    <Link className="btn btn-sm btn-default" to={'/'} >Cancelar</Link>
                  </div>
                </div>
            </form>
      </div>
    );
}

export default EditarProduto;