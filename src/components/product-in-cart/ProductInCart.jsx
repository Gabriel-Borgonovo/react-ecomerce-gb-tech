import './styles.css';

const ProductInCart = ({id, stock, image, name, price, quantity, onRemoveItem, onIncreaseItem, onDecreaseItem}) => {
    
    return(
        <div className='product-in-cart'>
            <img 
                className='prod-in-cart-img'
                src={image}
                alt={name} 
            />

            <div className='prod-in-cart-details'>
                <h3 className='prod-in-cart-h3'>{name}</h3>
                <p className='prod-in-cart-price'>${price}</p>
                <div className='cart-container-quantity'>
                    <span className='prod-in-cart-quantity'>cant: <b>{quantity}</b></span>
                    <div className='prod-in-cart-buttons'>
                         <button 
                            className='increment-qty'
                            onClick={() => onIncreaseItem(id)}
                            disabled={quantity === stock}
                            >+
                        </button>
                        <button
                            className='decrement-qty'
                            onClick={() => onDecreaseItem(id)}
                            >-
                        </button>
                    </div>
                </div>
            </div>
            <div className='prod-in-cart-actions'>
                <button 
                    className='prod-in-cart-remove decrement-qty'
                    onClick={() => onRemoveItem(id)}
                >X
                </button>
            </div>
        </div>
    );
}

export default ProductInCart;