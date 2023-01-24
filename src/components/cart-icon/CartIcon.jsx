import './styles.css';
const CartIcon = ({numberOfItems}) => {
    return(
        <div className='cart-icon-container'>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/5270/5270066.png" 
            alt="carrito de compras" 
            className="cart-icon"
        /> 
          <span className='span-product-counter'><b>
            {numberOfItems || 0}
            </b></span> 
        </div>
    );
}

export default CartIcon;