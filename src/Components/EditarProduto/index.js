import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { useForm } from "react-hook-form";
import { exibirMensagem } from '../../Services/toastr-service';

function EditarProduto () {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        api.get(`/produtos/${id}`).then(res => {
          const produto = res.data.data;

          setValue('idProduto', produto.id);
          setValue('nomeProduto', produto.nome);
          setValue('valorProduto', produto.preco);
        })

    }, []);

    function handleAlterarProduto(data) {
        api.put(`/produtos/${id}`, { 
            id: Number(data.idProduto),
            nome: data.nomeProduto,
            preco: data.valorProduto })
        .then(res => {
            exibirMensagem('Produto alterado com sucesso!', 'success');
            navigate("/");
        }).catch(res => {
          let mensagem = 'Ocorreu um erro tente novamente!';
          if ( res.response.status === 400 )
            mensagem = res.response.data.errors.join(',');

          exibirMensagem(mensagem, 'error');
        });

    }


    return (
        <div className="container">
          <div className="titulo-pagina">
            <h1>Incluir Produto</h1>
          </div>

              <form onSubmit={ handleSubmit( handleAlterarProduto ) } >
              <input type="hidden" { ... register("idProduto", { required: true })} />
              <div className="row">
                  <div className="col-md-4">
                    <label >Nome produto</label>
                    <input type="text" className="form-control" id="nomeProduto"
                        placeholder="Digite o nome do produto"
                        { ... register("nomeProduto", { required: true })} />

                        { errors.nomeProduto && <div className="invalid" > O nome do produto é obrigatório !</div>}
                  </div>
                  <div className="col-md-4">
                    <label>Valor produto</label>
                    <input type="number" className="form-control" id="valorProduto"
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

export default EditarProduto;