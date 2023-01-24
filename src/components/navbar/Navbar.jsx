import { useContext } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../cart-icon/CartIcon";
import { CartContext } from "../../context";
import './styles.css'

const Navbar = () => {

    const {cart} = useContext(CartContext);

    return(
        <header className="nav-header">
            <Link className="nav-link" to='/'><h2 className="nav-h2">GB</h2></Link>
            <nav className="nav-nav">
                <ul className="nav-ul">
                    <li className="nav-li">
                        <Link to='/' className="nav-li-link">Home</Link>
                    </li>
                    <li className="nav-li">
                        <Link to='/cart' className="nav-li-link">Cart</Link>
                    </li>
                </ul>
            </nav>
            <Link to='/cart'><CartIcon numberOfItems={cart.length} /></Link>
        </header>
    );
}

export default Navbar;