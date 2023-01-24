import { createContext, useState } from 'react';
//import useProducts from '../hooks/useProducts';

const initialState = {
    products: [],
    cart: [],
    setCart: () => {},
    getItemQuantity: () => {},
    onDecreaseItem: () => {},
    onIncreaseItem: () => {},
    total: 0
}

export const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    //const [products] = useProducts();

    const onIncreaseItem = (id) => {
        const productInCart =  products.find((product) => product.id === id);

        //si la cantidad de producto en el carrito es igual a la cantidad que hay en stock: salir
        if(cart?.find((product) => product.id === id)?.quantity === productInCart.stock) return;

        //si el carrito está vacío, debería setearlo con una copia del productInCart, es decir
        //al producto que se ha clickeado en el botón de más, y agregarle la propiedad quantity:1

        if(cart?.length === 0){
            
            setCart([{...productInCart, quantity:1}]); //con esto ya deberíamos tener el elemento agregado al carrito.
        
        }else if(cart.length > 0 && !cart?.find((product) => product.id === id)){ 
            //si el carrito ya tiene productos pero distintos al que estoy añadiendo
            //lo que voy a hacer es una copia de los datos previos del carrito, y a su vez añadir también el nuevo producto
            setCart([...cart, {...productInCart, quantity:1}]);
        }else{
            //si el producto existe en el carrito, con los datos actuales del carrito
            //lo que debo hacer es buscar con un map en ese arreglo de objetos que ya tengo
            setCart(currentCart => {
                return currentCart.map((product) => {
                    if(product.id === id){
                        return { ...product, quantity:product.quantity + 1}
                    }else { //para los productos que no coincidan con ese id
                        return product;
                    }
                })
            })

        }

    }


    //Solo voy a apretar el botón de menos cuando exista algun producto en mi carrito
    const onDecreaseItem = (id) => {
        if (cart?.find((product) => product.id === id)?.quantity === 1) {
            // Crea un nuevo arreglo de productos que contenga todos los productos del carrito excepto el que tenga el id especificado
            const newCart = cart.filter((product) => product.id !== id);
            // Actualiza el estado del carrito con el nuevo arreglo
            setCart(newCart);
          }else{
            
            const newCart = cart?.map((product) => {
                if(product.id === id){
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    }
                }else{
                    return product;
                }
            });

            setCart(newCart);
          }
    } 

    const getQuantity = (id) =>{
        return cart?.find((product) => product.id === id)?.quantity || 0;
    }

     const total = cart?.reduce((acc, product) => {
        return acc + (product.price * product.quantity);
    }, 0);

    const onRemoveItem = (id) => {
        const newCart = cart.filter((product) => product.id !== id);
        // Actualiza el estado del carrito con el nuevo arreglo
        setCart(newCart);
    }

    const resetCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{cart, setCart, onIncreaseItem, onDecreaseItem, getQuantity, onRemoveItem, total, products, setProducts, resetCart}}>
            {children}
        </CartContext.Provider>
    )
}