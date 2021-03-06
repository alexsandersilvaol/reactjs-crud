import './index.css';
import { Link, useNavigate }  from 'react-router-dom';
import { useState } from 'react';
import api from '../../api';

function IncluirProduto () {
    const navigate = useNavigate();
    const [nomeProduto, setNomeProduto] = useState('');
    const [valorProduto, setValorProduto] = useState(0);


    function handleIncluirProduto (event) {
      api.post('/produtos', { nome: nomeProduto, valor: valorProduto })
        .then(res => {
            console.log(res);
        });

      navigate("/");

      event.preventDefault();
    }

    return (
        <div className="container">
          <div className="titulo-pagina">
            <h1>Incluir Produto</h1>
          </div>

              <form onSubmit={ handleIncluirProduto }>
              <div className="row">
                  <div className="col-md-4">
                    <label >Nome produto</label>
                    <input type="text" className="form-control" id="nomeProduto"
                        placeholder="Digite o nome do produto" onChange={(event) => setNomeProduto(event.target.value) } />
                  </div>
                  <div className="col-md-4">
                    <label>Valor produto</label>
                    <input type="number" className="form-control" id="valorProduto" 
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

export default IncluirProduto;