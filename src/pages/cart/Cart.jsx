import {useContext} from 'react'
import { Link } from 'react-router-dom';
import ProductInCart from "../../components/product-in-cart/ProductInCart";
import { CartContext } from "../../context";
import './styles.css'

const Cart = () => {
    const {cart, total, onRemoveItem, onIncreaseItem, onDecreaseItem} = useContext(CartContext);

    return(
        <div className='cart-container'>
            <h2 className='cart-h2'>Carrito</h2>
            {cart.length === 0 ?(
                <div className='empty-cart-container'>
                   <h3 className='empty-cart'>El carrito está vacio</h3>
                   <img src="https://cdn-icons-png.flaticon.com/512/1815/1815352.png" alt="emoji-preocupado" />
                   <Link to='/' className='button-go-home'>Ir a comprar</Link>
                </div>
                ):(
                    <>
                        {
                            cart.map((item) => (
                                <ProductInCart 
                                    key={item.id} {...item} 
                                    onRemoveItem={onRemoveItem} 
                                    onIncreaseItem={onIncreaseItem} 
                                    onDecreaseItem={onDecreaseItem}
                                />
                            ))
                        }

                        <div className='button-order-container'>
                            <Link to={'/order-form'} className='button-generate-order'>Generar Ordén de Compra</Link>
                        </div>
                        
                    </> 
                )}

            <p className='cart-total-title'>Total</p>
            <h3 className='cart-total'>$ {total}</h3>
            
        </div>
    );
}

export default Cart;