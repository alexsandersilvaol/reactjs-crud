import { useEffect, useState } from 'react';
import apiData from '../../Service/ProdutoService';
import { Link } from 'react-router-dom';
import './index.css';

function ListaProdutos () {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        setProdutos(apiData.produtos);
    }, []);

    function handleRemoverProduto( event, id ) {
        apiData.produtos = apiData.produtos
            .filter(produto => produto.id !== id);

        setProdutos(apiData.produtos);

        event.preventDefault();
    }

    return (
        <table className="table tabela-produtos">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome do Produto</th>
            <th scope="col">Valor do Produto</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
            {
                produtos.map( produto => {
                    return <tr key={produto.id}>
                            <th>{produto.id}</th>
                            <td>{ produto.nome }</td>
                            <td>R$ { produto.valor }</td>
                            <td> 
                                <Link className="btn btn-sm btn-primary btn-editar" to={`/editar-produto/${produto.id}`}>Editar</Link>
                                <button className="btn btn-sm btn-danger" 
                                    onClick={ (event) => handleRemoverProduto(event, produto.id ) }>Excluir</button>
                            </td>
                        </tr>
                })
            }
        </tbody>
      </table>
    );
}

export default ListaProdutos;