import './index.css';
import { Link, useNavigate }  from 'react-router-dom';
import api from '../../Services/api';
import { login } from '../../Services/auth';
import { useForm } from "react-hook-form";

import { exibirMensagem } from '../../Services/toastr-service';

function LoginUsuario () {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) =>  { 
      api.post('/usuarios/login', { 
          email: data.emailUsuario,
          senha: data.senhaUsuario,
         })
        .then(res => {
          if ( res.data.success ) {
            login(res.data.data);
            exibirMensagem('Login efetuado com sucesso!', 'success');
            navigate("/");
          }
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
            <h1>Login</h1>
          </div>

              <form onSubmit = { handleSubmit(onSubmit) } >
              <div className="row">
                  <div className="col-md-4">
                    <label >E-mail Usuário</label>
                    <input type="email" className="form-control" name="emailUsuario"
                        placeholder="Digite o e-mail do usuário" 
                        { ... register("emailUsuario", { required: true })} />

                        { errors.emailUsuario && <div className="invalid" > O e-mail do usuário é obrigatório !</div>}
                  </div>
                  <div className="col-md-4">
                    <label >Senha Usuário</label>
                    <input type="password" className="form-control" name="senhaUsuario"
                        placeholder="Digite a senha do usuário" 
                        { ... register("senhaUsuario", { required: true })} />

                        { errors.senhaUsuario && <div className="invalid" > A senha do usuário é obrigatório !</div>}
                  </div>

                  <div className="col-md-4 align-self-end">
                    <button type="submit" className="btn btn-sm btn-primary botao-salvar">Login</button>
                    <Link className="btn btn-sm btn-default" to={'/'} >Cancelar</Link>
                  </div>
                </div>
            </form>
      </div>
    );
}

export default LoginUsuario;