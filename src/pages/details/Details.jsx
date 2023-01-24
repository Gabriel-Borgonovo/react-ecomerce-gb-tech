import React, { useContext, useEffect, useState } from 'react';

import './styles.css';
import {  Link, useParams} from 'react-router-dom';
import { CartContext } from '../../context';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { firebaseServices } from '../../services/firebase';

const { getProductById } = firebaseServices;

const Detail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const {onIncreaseItem, onDecreaseItem, getQuantity, products, setProducts} = useContext(CartContext)

    const {id} = useParams() || {};
    
    /**hecho por el profe */

    useEffect(() => {
        setLoading(true);
        getProductById(id)
            .then((product) => {
                setProduct(product[0]);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            })
    },[id]);

    useEffect(() => {
        if(products.length === 0){
            const db = getFirestore();
            const q = query(
                collection(db, 'products'),
            );

            getDocs(q)
                .then((snapshot) => {
                    snapshot.forEach((doc) =>{
                        setProducts((prev) => [...prev, doc.data()])
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },[products.length, setProducts])

    /********************************************** */

    const quantity = getQuantity(id);


    return(
        <>
            
            {loading && <Loader />}
            
            {product && ( <div className='detail-container'>
            <section className='detail-product-container'>
                <img src={product.image} alt={product.name} />
                <div className='detail-text-container'>
                    <h2 className='detail-h2'>{product.name}</h2>
                    <p className='detail-p-description valoration'>{product.valoration}</p>
                    <h3 className='detail-price'>${product.price}</h3>
                    <ul className='detail-ul'>
                        <li>Hay en stock: <b>{product.stock}</b> unidades.</li>
                        <li>Categoría: <b>{product.category}</b>.</li>
                        <li>Unidades vendidas: +<b>{product.sold}</b>.</li>
                    </ul>
                    
                    <section className='detail-form'>
                    <input
                        disabled
                        type="text"
                        className="count-amount"
                        value={quantity}
                    />
                        <div className='button-container prod-in-cart-buttons'>
                            <button 
                                className='increment-qty increment'
                                onClick={() => onIncreaseItem(id)}
                                disabled={quantity === product.stock}
                            >+</button>
                            <button
                                className='decrement-qty decrement'
                                onClick={() => onDecreaseItem(id)}
                            >-
                            </button>
                        </div>
                    </section>
                    
                    <p className='detail-p-description'>{product.description}</p>
                   
                   <div className='container-detail-button'>
                        <Link to='/cart' className='detail-button-go-to-cart'>Ir al carrito</Link>
                   </div>
                    
                </div>
            </section>
        </div>
       )}
       </>
    );
}

export default Detail;