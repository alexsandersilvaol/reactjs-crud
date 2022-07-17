import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import api from '../../api';

function ListaProdutos () {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        listarProdutos();

    }, []);

    function handleRemoverProduto( event, id ) {

        api.delete(`/produtos/${id}`)
        .then(res => {
            console.log(res);
        });

        listarProdutos();


        event.preventDefault();
    }

    function listarProdutos() {
        api.get('/produtos')
        .then(res => {
            setProdutos(res.data.produtos);
        });
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