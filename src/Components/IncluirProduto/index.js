import './index.css';
import { Link, useNavigate }  from 'react-router-dom';
import api from '../../Services/api';
import { useForm } from "react-hook-form";
import { exibirMensagem } from '../../Services/toastr-service';

function IncluirProduto () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) =>  { 
      api.post('/produtos', { nome: data.produtoNome, preco: data.valorProduto })
        .then(res => {
            exibirMensagem('Produto cadastrado com sucesso!', 'success');
            navigate("/");
        }).catch(res => {
          let mensagem = 'Ocorreu um erro tente novamente!';
          if ( res.response.status === 400 )
            mensagem = res.response.data.errors.join(',');

          exibirMensagem(mensagem, 'error');
        });

    };

    return (
        <div className="container">
          <div className="titulo-pagina">
            <h1>Incluir Produto</h1>
          </div>

              <form onSubmit = { handleSubmit(onSubmit) } >
              <div className="row">
                  <div className="col-md-4">
                    <label >Nome produto</label>
                    <input type="text" className="form-control" name="nomeProduto"
                        placeholder="Digite o nome do produto" 
                        { ... register("produtoNome", { required: true })} />

                        { errors.produtoNome && <div className="invalid" > O nome do produto é obrigatório !</div>}
                  </div>
                  <div className="col-md-4">
                    <label>Valor produto</label>
                    <input type="number" className="form-control" name="valor_produto"
                      placeholder="Digite o valor do produto"
                      { ... register("valorProduto", { required: true, min: 1 })} />
                      { errors.valorProduto && <div className="invalid"> O valor do produto é obrigatório e deve ser no mínimo 1!</div>}
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