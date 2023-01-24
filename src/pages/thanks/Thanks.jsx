import { useContext } from "react";
import { CartContext } from "../../context";
import { Link } from "react-router-dom";
import './styles.css';

const Thanks = () => {
    const {resetCart} = useContext(CartContext);

    

    return(
        <div className="thanks-container">
            <h2 className="thanks-h2">Muchas gracias por tu compra</h2>
            <Link to='/' className="button-go-home thanks" onClick={resetCart}>Ver más productos</Link>
        </div>
    );
}

export default Thanks;