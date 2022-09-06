import ListaProdutos from "../ListaProdutos";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { isAuthenticated, logout } from "../../Services/auth";

function Home() {
    const [estaLogado, setEstaLogado] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEstaLogado(isAuthenticated());
      }, []);
    
    function BotaoLogin() {
        if ( estaLogado === false ) {
            return <>
                <div className="col-sm-4">
                    <Link className="btn btn-primary" to={"/login"}>Login</Link>
                </div>
            </>;
        } else {
            return <></>;
        }
    }

    function handleLogout( event ) {
        logout();
        setEstaLogado(false);
        
        event.preventDefault();
    }

    function BotaoLogout() {
        if ( estaLogado ) {
            return <>
                <div className="col-sm-4">
                    <button className="btn btn-primary" onClick={handleLogout} >Logout</button>
                </div>
            </>;
        } else {
            return <></>;
        }
    }

    function BotaoAdicionarProduto() {
        if ( estaLogado ) {
            return <>
                
                <div className="col-sm-4">
                    <Link className="btn btn-primary" to={"/incluir-produto"}>Adicionar Produto</Link>
                </div>
            </>;
        } else {
            return <></>;
        }
    }

    return (
        <div className="container">
            <h1>Produtos</h1>

            <div className="row justify-content-end mt-3">
                <div className="col-sm-4">
                    <Link className="btn btn-primary" to={"/incluir-usuario"}>Incluir Usuário</Link>
                </div>
                <BotaoAdicionarProduto />
                <BotaoLogin />
                <BotaoLogout />
            </div>
            <ListaProdutos />
        </div>
    );
}

export default Home;