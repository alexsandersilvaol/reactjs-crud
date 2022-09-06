import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import api from '../../Services/api';
import { exibirMensagem } from '../../Services/toastr-service';
import { isAuthenticated } from '../../Services/auth';

function ListaProdutos () {
    const [produtos, setProdutos] = useState([]);
    const [estaLogado, setEstaLogado] = useState(false);

    useEffect(() => {
        setEstaLogado(isAuthenticated());
        listarProdutos();
    }, []);

    function handleRemoverProduto( event, id ) {

        api.delete(`/produtos/${id}`)
        .then(res => {
            exibirMensagem('Produto removido com sucesso!', 'success');
            listarProdutos();
        }).catch(res => {
            let mensagem = 'Ocorreu um erro tente novamente!';
            if ( res.response.status === 400 )
              mensagem = res.response.data.errors.join(',');
  
            exibirMensagem(mensagem, 'error');
          });

        event.preventDefault();
    }

    function listarProdutos() {
        api.get('/produtos')
        .then(res => {
            setProdutos(res.data.data);
        }).catch(res => {
           let mensagem = 'Ocorreu um erro tente novamente!';
           if ( res.response.status === 400 )
              mensagem = res.response.data.errors.join(',');
  
           exibirMensagem(mensagem, 'error');
        });
    }

    function BotaoExcluir ( produto ) {
        if ( estaLogado ) {
            return <button className="btn btn-sm btn-danger" 
            onClick={ (event) => handleRemoverProduto(event, produto.id ) }>Excluir</button>
        } else {
            return <></>;
        }
    }

    function BotaoAlterar( produto ) {
        if ( estaLogado ) {
            return <Link className="btn btn-sm btn-primary btn-editar" 
                to={`/editar-produto/${produto.id}`}>Editar</Link>
        } else {
            return <></>;
        }
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
                            <td>R$ { produto.preco }</td>
                            <td>
                                <BotaoExcluir produto={produto} /> 
                                <BotaoAlterar produto={produto} />
                            </td>
                        </tr>
                })
            }
        </tbody>
      </table>
    );
}

export default ListaProdutos;