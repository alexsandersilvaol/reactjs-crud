import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import apiData from "../../Service/ProdutoService";

function EditarProduto () {
    const { id } = useParams();
    const navigate = useNavigate();

    const [idProduto, setIdProduto] = useState(0);
    const [nomeProduto, setNomeProduto] = useState("");
    const [valorProduto, setValorProduto] = useState(0);

    useEffect(() => {
        const produto = apiData.produtos.find( produto => produto.id === Number(id) );
        setIdProduto(produto.id);
        setNomeProduto(produto.nome);
        setValorProduto(produto.valor);

    }, []);

    function handleAlterarProduto() {
        const produtos = apiData.produtos;
        const index = produtos.findIndex( produto => produto.id === Number(id) );
        const produto = {
            id: Number(idProduto),
            nome: nomeProduto,
            valor: valorProduto
        };

        produtos[index] = produto;
        apiData.produtos = produtos;

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