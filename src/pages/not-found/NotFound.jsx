import { useRouteError, Link } from "react-router-dom";
import './styles.css';

const NotFound = () => {
    const error = useRouteError();
    console.log(error);

    return(
        <div className="not-found-container">
            <div className="not-found-messages">
                <div>
                    <h1 className="not-found-h1">404</h1>
                    <p className="not-found-error"><b>Error:</b> {error.statusText || error.message}</p>
                </div>
                
            </div>
            <img className="not-found-img" src="https://cdn.memegenerator.es/descargar/31522957" alt="perdido" />
            <span className="not-found-p">Click en el siguiente botón para</span>
            <Link to="/" className="button-go-home button-not-found">Ir a la página</Link>
        </div>
    );
}

export default NotFound;