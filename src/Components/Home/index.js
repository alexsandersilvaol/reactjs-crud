import ListaProdutos from "../ListaProdutos";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container">
            <h1>Produtos</h1>

            <div className="row justify-content-end mt-3">
                <div className="col-sm-4">
                    <Link className="btn btn-primary" to={"/incluir-produto"}>Adicionar Produto</Link>
                </div>
            </div>

            <ListaProdutos />
        </div>
    );
}

export default Home;